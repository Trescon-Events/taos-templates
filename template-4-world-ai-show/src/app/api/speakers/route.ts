import { NextResponse } from "next/server";

const KONFHUB_API = "https://api.konfhub.com/event/public/wais-f45-indonesia/speakers";

export const revalidate = 0; // always fetch fresh from KonfHub

export async function GET() {
  try {
    const res = await fetch(KONFHUB_API, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`KonfHub API error: ${res.status}`);

    const data = await res.json();

    const uncategorized: Record<string, unknown>[] = Array.isArray(data.uncategorized) ? data.uncategorized : [];
    const categorized: Record<string, unknown>[] = Array.isArray(data.categorized)
      ? data.categorized.flatMap((cat: Record<string, unknown>) =>
          Array.isArray(cat.speakers) ? (cat.speakers as Record<string, unknown>[]) : []
        )
      : [];

    const raw = [...uncategorized, ...categorized];

    if (raw.length === 0) throw new Error("No speakers returned from KonfHub");

    const speakers = raw.map((s: Record<string, unknown>) => ({
      name:    String(s.name ?? ""),
      title:   String(s.designation ?? s.title ?? ""),
      org:     String(s.organisation ?? s.organization ?? s.company ?? ""),
      img:     String(s.image_url ?? s.profile_image_url ?? s.photo ?? ""),
      bio:     String(s.about ?? s.bio ?? s.description ?? "").replace(/<[^>]+>/g, "").trim(),
      tag:     "Speaker",
      topic:   "",
      country: "Indonesia",
    }));

    return NextResponse.json({ speakers }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("KonfHub speaker fetch error:", err);
    return NextResponse.json({ speakers: [], error: "Could not load speakers" }, { status: 500 });
  }
}
