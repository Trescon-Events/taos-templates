import type { Speaker } from "@/types";

const ENDPOINT = "https://api.konfhub.com/event/capture/v2";
const SPEAKER_TICKET_ID = "100841";   // "Speaker Registration" ticket on Vault 2047

// Minimal country-name → ISO-2 map for common attendee countries.
// Falls back to "in" (India) if not found.
const COUNTRY_ISO: Record<string, string> = {
  "india": "in", "united states": "us", "usa": "us", "united kingdom": "gb", "uk": "gb",
  "uae": "ae", "united arab emirates": "ae", "singapore": "sg", "malaysia": "my",
  "hong kong": "hk", "japan": "jp", "south korea": "kr", "germany": "de",
  "france": "fr", "australia": "au", "brazil": "br", "south africa": "za",
  "nigeria": "ng", "canada": "ca", "china": "cn", "indonesia": "id",
  "thailand": "th", "sri lanka": "lk", "bangladesh": "bd", "pakistan": "pk",
  "nepal": "np", "bahrain": "bh", "saudi arabia": "sa", "qatar": "qa",
  "kuwait": "kw", "oman": "om", "israel": "il", "turkey": "tr",
};

function toISO(country: string): string {
  return COUNTRY_ISO[country.trim().toLowerCase()] ?? "in";
}

interface KonfHubResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}

export async function registerSpeakerOnKonfHub(speaker: Speaker): Promise<KonfHubResult> {
  const apiKey  = process.env.KONFHUB_API_KEY;
  const eventId = process.env.KONFHUB_EVENT_ID;

  if (!apiKey || !eventId) {
    return { success: false, error: "KonfHub credentials not configured" };
  }

  // Skip if already registered
  if (speaker.konfhubBookingId) {
    return { success: true, bookingId: speaker.konfhubBookingId };
  }

  // Require at minimum: name + email
  if (!speaker.name || !speaker.email) {
    return { success: false, error: "Speaker must have a name and email to register on KonfHub" };
  }

  const payload = {
    event_id: eventId,
    registration_tz: "Asia/Kolkata",
    utm: {
      utm_source: "vault2047-website",
      utm_medium: "admin-approval",
      utm_campaign: "speaker-registration",
    },
    registration_details: {
      [SPEAKER_TICKET_ID]: [
        {
          name:         speaker.name,
          email_id:     speaker.email,
          phone_number: speaker.phone    || "",
          dial_code:    speaker.dialCode || "+91",
          country_code: toISO(speaker.country || "India"),
          designation:  speaker.role     || "",
          // optional extras — KonfHub ignores unknown fields gracefully
          company:      speaker.org      || speaker.company || "",
          linkedin:     speaker.linkedin || "",
        },
      ],
    },
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json() as {
      booking_id?: string[];
      title?: string;
      message?: string;
    };

    if (!res.ok) {
      console.error("KonfHub registration failed:", data);
      return { success: false, error: JSON.stringify(data) };
    }

    const bookingId = data.booking_id?.[0];
    console.log(`KonfHub: registered ${speaker.name} → booking ${bookingId}`);
    return { success: true, bookingId };

  } catch (err) {
    console.error("KonfHub network error:", err);
    return { success: false, error: String(err) };
  }
}
