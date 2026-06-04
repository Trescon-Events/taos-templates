import { requireAdmin } from "@/lib/auth";
import { getActiveSpeakers, getActivePartners } from "@/lib/db";

export async function POST() {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const speakers = getActiveSpeakers();
    const partners = getActivePartners();

    const apiKey = process.env.KONFHUB_API_KEY;

    if (!apiKey) {
      return Response.json({
        ok: true,
        message: "KonfHub API key not configured",
      });
    }

    const eventId = process.env.KONFHUB_EVENT_ID;
    const url = `https://api.konfhub.com/v1/events/${eventId}/speakers`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ speakers, partners }),
    });

    return Response.json({
      ok: true,
      synced: {
        speakers: speakers.length,
        partners: partners.length,
      },
    });
  } catch (err) {
    console.error("KonfHub sync error:", err);
    return Response.json({ error: "Sync failed" }, { status: 500 });
  }
}
