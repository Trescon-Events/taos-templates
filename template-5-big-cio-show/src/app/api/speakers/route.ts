import { NextResponse } from "next/server";

const EVENT_URL = "big-cio-show-awards-2026";
const KONFHUB_API = `https://api.konfhub.com/event/public/${EVENT_URL}/speakers`;

export async function GET() {
  try {
    const res = await fetch(KONFHUB_API, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("KonfHub speakers error:", res.status, text);
      return NextResponse.json({ error: `KonfHub API error: ${res.status}`, speakers: [] }, { status: 200 });
    }

    const data = await res.json();

    const uncategorized: Record<string, unknown>[] = Array.isArray(data.uncategorized) ? data.uncategorized : [];
    const categorized: Record<string, unknown>[] = Array.isArray(data.categorized)
      ? data.categorized.flatMap((cat: Record<string, unknown>) =>
          Array.isArray(cat.speakers) ? (cat.speakers as Record<string, unknown>[]) : []
        )
      : [];

    const raw = [...uncategorized, ...categorized];

    const speakers = raw.map((s: Record<string, unknown>) => ({
      id:       s.speaker_id ?? s.id ?? "",
      name:     s.name ?? "",
      title:    s.designation ?? s.title ?? "",
      company:  s.organisation ?? s.organization ?? s.company ?? "",
      img:      s.image_url ?? s.profile_image_url ?? s.photo ?? "",
      bio:      s.about ?? s.bio ?? s.description ?? "",
      linkedin: s.linkedin_url ?? s.linkedin ?? "",
      twitter:  s.twitter_url ?? s.twitter ?? "",
    }));

    return NextResponse.json({ speakers });
  } catch (err) {
    console.error("KonfHub fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch speakers", speakers: [] }, { status: 200 });
  }
}
