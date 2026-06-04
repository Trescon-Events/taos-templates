import { NextRequest } from "next/server";
import { getSpeakers, updateSpeaker, deleteSpeaker } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { sendRejectionEmail } from "@/lib/email";
import { registerSpeakerOnKonfHub } from "@/lib/konfhub";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const all = getSpeakers();
  const speaker = all.find((s) => s.id === id);
  if (!speaker) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(speaker);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const existing = getSpeakers().find(s => s.id === id);
    const updated = updateSpeaker(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });

    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
      const konfhubResult = await registerSpeakerOnKonfHub(updated).catch(err => {
        console.error("KonfHub sync error:", err);
        return { success: false as const };
      });
      if (konfhubResult.success && konfhubResult.bookingId) {
        updateSpeaker(id, { konfhubBookingId: konfhubResult.bookingId });
      }
    }

    if (body.status === "rejected" && existing?.status !== "rejected" && body.rejectionNote) {
      const notifyEmail = process.env.REJECTION_NOTIFY_EMAIL;
      if (notifyEmail) {
        await sendRejectionEmail({
          toEmail: notifyEmail,
          toName: updated.name,
          module: "speakers",
          itemTitle: updated.name,
          reason: body.rejectionNote,
        }).catch(err => console.error("Rejection email error:", err));
      }
    }

    return Response.json(updated);
  } catch (err) {
    console.error("Update speaker error:", err);
    return Response.json({ error: "Failed to update speaker" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const existing = getSpeakers().find(s => s.id === id);
    const updated = updateSpeaker(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });

    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
      const konfhubResult = await registerSpeakerOnKonfHub(updated).catch(err => {
        console.error("KonfHub sync error:", err);
        return { success: false as const };
      });
      if (konfhubResult.success && konfhubResult.bookingId) {
        updateSpeaker(id, { konfhubBookingId: konfhubResult.bookingId });
      }
    }

    if (body.status === "rejected" && existing?.status !== "rejected" && body.rejectionNote) {
      const notifyEmail = process.env.REJECTION_NOTIFY_EMAIL;
      if (notifyEmail) {
        await sendRejectionEmail({
          toEmail: notifyEmail,
          toName: updated.name,
          module: "speakers",
          itemTitle: updated.name,
          reason: body.rejectionNote,
        }).catch(err => console.error("Rejection email error:", err));
      }
    }

    return Response.json(updated);
  } catch (err) {
    console.error("Update speaker error:", err);
    return Response.json({ error: "Failed to update speaker" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const deleted = deleteSpeaker(id);
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Delete speaker error:", err);
    return Response.json({ error: "Failed to delete speaker" }, { status: 500 });
  }
}
