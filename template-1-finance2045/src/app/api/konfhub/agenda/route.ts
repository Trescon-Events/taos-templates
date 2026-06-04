import { NextResponse } from "next/server";
import type { KonfHubSession, KonfHubTrack } from "@/types/konfhub";

const EVENT_ID = "217c0660-e280-45f5-9316-b3aa5e962b4a";
const EVENT_SLUG = "wais-f45-indonesia";
const TRACK_FILTER = "finance 2045";

const EVENT_INFO_URL = `https://api.konfhub.com/event/public/${EVENT_SLUG}`;

export const dynamic = "force-dynamic";

function tracksUrl(date: string) {
  return `https://api.konfhub.com/event/${EVENT_ID}/public/tracks?track_date=${date}`;
}

function sessionsUrl(date: string) {
  return `https://api.konfhub.com/event/${EVENT_ID}/sessions?sessions_to_return=assigned&session_date=${date}`;
}

/** Generate array of YYYY-MM-DD strings between two dates (inclusive) */
function dateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const cur = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cur <= last) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

export async function GET() {
  try {
    // Step 1: get event dates
    const infoRes = await fetch(EVENT_INFO_URL, { next: { revalidate: 0 } });
    if (!infoRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch event info from KonfHub", status: infoRes.status },
        { status: infoRes.status }
      );
    }
    const info: { start_date?: string; end_date?: string } = await infoRes.json();
    const startDate = info.start_date ?? "2026-07-07";
    const endDate = info.end_date ?? startDate;
    const dates = dateRange(startDate, endDate);

    // Step 2: for each day, get Finance 2045 session IDs from tracks + full sessions with timestamps
    const dayResults = await Promise.all(
      dates.map(async (date) => {
        // Fetch tracks to identify Finance 2045 session IDs
        const tracksRes = await fetch(tracksUrl(date), { next: { revalidate: 0 } });
        if (!tracksRes.ok) return { date, sessions: [] };
        const tracks: KonfHubTrack[] = await tracksRes.json();

        const f45Track = tracks.find((t) =>
          t.track_title.toLowerCase().includes(TRACK_FILTER)
        );
        if (!f45Track) return { date, sessions: [] };

        const f45SessionIds = new Set(
          (f45Track.track_sessions ?? []).map((s) => s.session_id)
        );

        // Fetch sessions endpoint which has real timestamps
        const sessionsRes = await fetch(sessionsUrl(date), { next: { revalidate: 0 } });
        if (!sessionsRes.ok) {
          // Fall back to tracks data (no timestamps)
          const fallbackSessions = [...(f45Track.track_sessions ?? [])].sort(
            (a, b) => (a.session_order ?? 0) - (b.session_order ?? 0)
          );
          return { date, track_id: f45Track.track_id, track_title: f45Track.track_title, sessions: fallbackSessions };
        }

        const sessionsData: { sessions?: KonfHubSession[] } | KonfHubSession[] = await sessionsRes.json();
        const allSessions: KonfHubSession[] = Array.isArray(sessionsData)
          ? sessionsData
          : (sessionsData as { sessions?: KonfHubSession[] }).sessions ?? [];

        // Filter to Finance 2045 sessions and sort by start_timestamp then session_order
        const f45Sessions = allSessions
          .filter((s) => f45SessionIds.has(s.session_id))
          .sort((a, b) => {
            if (a.start_timestamp && b.start_timestamp) {
              return a.start_timestamp.localeCompare(b.start_timestamp);
            }
            return (a.session_order ?? 0) - (b.session_order ?? 0);
          });

        return {
          date,
          track_id: f45Track.track_id,
          track_title: f45Track.track_title,
          sessions: f45Sessions,
        };
      })
    );

    return NextResponse.json(
      { count: dayResults.length, data: dayResults },
      {
        headers: {
          "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[konfhub/agenda] fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch agenda from KonfHub" },
      { status: 502 }
    );
  }
}

export type { KonfHubSession, KonfHubTrack };
