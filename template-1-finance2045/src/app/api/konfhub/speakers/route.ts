import { NextResponse } from "next/server";
import type { KonfHubSpeaker } from "@/types/konfhub";

const KONFHUB_SPEAKERS_URL =
  "https://api.konfhub.com/event/public/wais-f45-indonesia/speakers";

const TRACK_FILTER = "finance 2045";

export const dynamic = "force-dynamic"; // always fetch at request time, never statically cached

export async function GET() {
  try {
    const res = await fetch(KONFHUB_SPEAKERS_URL, {
      next: { revalidate: 0 }, // no Next.js cache — Route Handler cache-control handles TTL
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `KonfHub upstream error`, status: res.status },
        { status: res.status }
      );
    }

    const raw: {
      categorized: Array<{
        category_id: number;
        category_name: string;
        category_order: number;
        speakers: KonfHubSpeaker[];
      }>;
      uncategorized: KonfHubSpeaker[];
    } = await res.json();

    // Keep only Finance 2045 category speakers
    const finance2045Categories = (raw.categorized ?? []).filter((cat) =>
      cat.category_name.toLowerCase().includes(TRACK_FILTER)
    );

    const speakers: KonfHubSpeaker[] = finance2045Categories.flatMap(
      (cat) => cat.speakers
    );

    // Sort by speaker_order ascending
    speakers.sort((a, b) => (a.speaker_order ?? 0) - (b.speaker_order ?? 0));

    return NextResponse.json(
      { count: speakers.length, data: speakers },
      {
        headers: {
          "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[konfhub/speakers] fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch speakers from KonfHub" },
      { status: 502 }
    );
  }
}

export type { KonfHubSpeaker };
