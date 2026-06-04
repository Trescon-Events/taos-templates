import { NextResponse } from "next/server";

const EVENT_ID  = "e7536c28-b198-40ab-93ee-34bcaf43d909";
const EVENT_DATE = "2026-06-04";
const TRACK_FILTER = "world cx summit"; // matches "World CX Summit & Awards"

const TRACKS_URL   = `https://api.konfhub.com/event/${EVENT_ID}/public/tracks?track_date=${EVENT_DATE}`;
// No session_date filter — one session has a wrong UTC date in KonfHub (2026-06-03 instead of 2026-06-04)
// We rely on track membership (allowedIds) to scope sessions correctly instead.
const SESSIONS_URL = `https://api.konfhub.com/event/${EVENT_ID}/sessions?sessions_to_return=assigned`;

/** Convert UTC timestamp "2026-06-04 03:30:00" → IST "09:00 AM" (UTC+5:30) */
function toIST(utcStr: string | null | undefined): string {
  if (!utcStr) return "";
  try {
    const dt = new Date(utcStr.replace(" ", "T") + "Z");
    const totalMins = dt.getUTCHours() * 60 + dt.getUTCMinutes() + 330; // +5:30
    const h24 = Math.floor(totalMins / 60) % 24;
    const m   = (totalMins % 60).toString().padStart(2, "0");
    const ampm = h24 >= 12 ? "PM" : "AM";
    const h12  = h24 % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  } catch {
    return "";
  }
}

function classifySession(title: string, tags: string[] = []): string {
  const t = title.toLowerCase();

  // Title-based — high confidence signals
  if (t.includes("registration") || t.includes("check-in")) return "registration";
  if (t.includes("welcome") || t.includes("opening") || t.includes("vote of thanks") || t.includes("facilitating")) return "ceremony";
  if (t.includes("coffee") || t.includes("boomwhacker") || t.includes("percussion")) return "break";
  if (t.includes("lunch") || t.includes("luncheon")) return "networking";
  if (t.includes("cocktail") || t.includes("networking session") || t.includes("peer networking")) return "networking";
  if (t.includes("awards") || t.includes("gala")) return "awards";
  if (t.includes("reserved for")) return "techtalk";

  // Tag-based — use KonfHub tags as source of truth for session format
  if (tags.includes("Tech Talk"))        return "techtalk";
  if (tags.includes("Panel Discussion")) return "panel";
  if (tags.includes("Fireside Chat"))    return "fireside";
  if (tags.includes("Coffee Break"))     return "break";
  if (tags.includes("Keynote"))          return "keynote";

  // Title fallback
  if (t.includes("panel") || t.includes("discussion")) return "panel";
  if (t.includes("fireside")) return "fireside";

  return "keynote";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tagIds = searchParams.get("tag_ids"); // e.g. "fe01c105|08d9d8ec"

  const sessionsUrl = tagIds
    ? `${SESSIONS_URL}&tag_ids=${encodeURIComponent(tagIds)}`
    : SESSIONS_URL;

  try {
    // Fetch tracks and sessions in parallel
    const [tracksRes, sessionsRes] = await Promise.all([
      fetch(TRACKS_URL,  { next: { revalidate: 1800 } }),
      fetch(sessionsUrl, { next: { revalidate: 1800 } }),
    ]);

    // Build allowed session ID set from the "World CX Summit & Awards" track
    const allowedIds = new Set<number>();
    const orderMap   = new Map<number, number>();

    if (tracksRes.ok) {
      const tracks: Record<string, unknown>[] = await tracksRes.json();
      const wcxTrack = tracks.find((t) =>
        (t.track_title as string).toLowerCase().includes(TRACK_FILTER)
      );
      if (wcxTrack) {
        const trackSessions = wcxTrack.track_sessions as Record<string, unknown>[] | null;
        (trackSessions ?? []).forEach((s, idx) => {
          const sid = s.session_id as number;
          allowedIds.add(sid);
          orderMap.set(sid, s.session_order as number ?? idx);
        });
      }
    }

    if (!sessionsRes.ok) {
      return NextResponse.json(
        { error: `KonfHub sessions API error: ${sessionsRes.status}`, sessions: [] },
        { status: 200 }
      );
    }

    const raw: Record<string, unknown>[] = await sessionsRes.json();

    const sessions = raw
      .filter((s) => {
        // Only sessions in the WCX track (if we got track data)
        if (allowedIds.size > 0 && !allowedIds.has(s.session_id as number)) return false;
        return true;
      })
      .map((s) => {
        const speakers = Array.isArray(s.session_speakers)
          ? (s.session_speakers as Record<string, unknown>[]).map((sp) => ({
              name:         sp.name ?? "",
              designation:  sp.designation ?? "",
              organisation: sp.organisation ?? "",
              image_url:    sp.image_url ?? "",
            }))
          : [];

        return {
          id:       s.session_id,
          title:    s.session_title ?? "",
          desc:     s.session_description ?? "",
          start:    toIST(s.start_timestamp as string),
          end:      toIST(s.end_timestamp as string),
          rawStart: (s.start_timestamp as string) ?? "",
          type:     classifySession(s.session_title as string, ((s.tags as {name:string}[]) ?? []).map(t => t.name)),
          location: s.session_location ?? "",
          order:    orderMap.get(s.session_id as number) ?? (s.session_order as number) ?? 999,
          speakers,
        };
      })
      .sort((a, b) => {
        // Sort by track order (reliable from KonfHub) — timestamps can have wrong dates
        return (a.order as number) - (b.order as number);
      })
      .map(({ rawStart: _raw, ...rest }) => rest);

    return NextResponse.json(
      { sessions },
      { headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("KonfHub agenda fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch agenda", sessions: [] }, { status: 200 });
  }
}
