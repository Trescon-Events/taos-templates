import { NextRequest } from "next/server";
import { getSpeakers, updateSpeaker } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { registerSpeakerOnKonfHub } from "@/lib/konfhub";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const speaker = getSpeakers().find(s => s.id === id);
  if (!speaker) return Response.json({ error: "Not found" }, { status: 404 });

  if (speaker.status !== "approved") {
    return Response.json({ error: "Speaker must be approved before syncing to KonfHub" }, { status: 400 });
  }

  if (!speaker.email) {
    return Response.json({ error: "Speaker has no email address — please add an email before syncing" }, { status: 400 });
  }

  // Force re-register even if already synced (manual sync should re-attempt)
  const speakerForSync = { ...speaker, konfhubBookingId: undefined };

  const result = await registerSpeakerOnKonfHub(speakerForSync);

  if (!result.success) {
    return Response.json({ error: result.error ?? "KonfHub registration failed" }, { status: 502 });
  }

  const updated = updateSpeaker(id, { konfhubBookingId: result.bookingId });
  return Response.json({ ok: true, bookingId: result.bookingId, speaker: updated });
}
