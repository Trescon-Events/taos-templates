import { NextResponse } from "next/server";

const EVENT_ID = "9528e7a7-0d87-44a7-977d-ebb04dc72f4a";
const IST_OFFSET = 5.5 * 60 * 60 * 1000; // UTC+5:30 in ms

const TAG_TO_TYPE: Record<string, string> = {
  "Registration":        "registration",
  "Opening Address":     "plenary",
  "Panel Discussion":    "panel",
  "Tech Talk":           "tech-talk",
  "Networking":          "networking",
  "Ice-Breaker Activity":"networking",
  "Awards Ceremony":     "awards",
  "Fireside Chat":       "fireside",
  "Keynote":             "keynote",
  "Roundtable":          "roundtable",
  "Case Study":          "case-study",
  "Workshop":            "workshop",
};

function utcToIST(timestamp: string): { time: string; date: string } {
  // timestamp format: "2026-06-03 03:30:00"
  const utcDate = new Date(timestamp.replace(" ", "T") + "Z");
  const istDate = new Date(utcDate.getTime() + IST_OFFSET);
  const hours   = istDate.getUTCHours().toString().padStart(2, "0");
  const minutes = istDate.getUTCMinutes().toString().padStart(2, "0");
  const day     = istDate.getUTCDate().toString().padStart(2, "0");
  const month   = (istDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const year    = istDate.getUTCFullYear();
  return { time: `${hours}:${minutes}`, date: `${year}-${month}-${day}` };
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.konfhub.com/event/${EVENT_ID}/sessions?sessions_to_return=all`,
      { headers: { Accept: "application/json" }, next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`KonfHub API error: ${res.status}`);

    const raw = await res.json();

    if (!Array.isArray(raw)) {
      return NextResponse.json({ sessions: [] });
    }

    // Sort by session_order / start_timestamp
    const sorted = [...raw].sort((a, b) => {
      if (a.session_order !== b.session_order)
        return (a.session_order ?? 999) - (b.session_order ?? 999);
      return a.start_timestamp.localeCompare(b.start_timestamp);
    });

    const sessions = sorted.map(s => {
      const tag     = s.tags?.[0]?.name ?? "";
      const type    = TAG_TO_TYPE[tag] ?? "plenary";
      const { time, date } = utcToIST(s.start_timestamp);
      const endIST  = utcToIST(s.end_timestamp);

      return {
        session_id:   s.session_id,
        title:        s.session_title,
        description:  s.session_description ?? "",
        type,
        tag,
        time,
        end_time:     endIST.time,
        date,
        colour:       s.session_colour ?? "#7C3AED",
        location:     s.session_location ?? "",
        speakers:     (s.session_speakers ?? []).map((sp: {
          speaker_id: number; name: string; designation: string;
          organisation: string; image_url: string; linkedin_url: string;
        }) => ({
          id:           sp.speaker_id,
          name:         sp.name,
          designation:  sp.designation ?? "",
          organisation: sp.organisation ?? "",
          image:        sp.image_url ?? "",
          linkedin:     sp.linkedin_url ?? "",
        })),
      };
    });

    return NextResponse.json({ sessions });
  } catch (err) {
    console.error("Agenda API error:", err);
    return NextResponse.json({ sessions: [], error: "Failed to load agenda" }, { status: 500 });
  }
}
