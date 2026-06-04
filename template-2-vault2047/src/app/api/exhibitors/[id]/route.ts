import { NextRequest } from "next/server";
import { getExhibitors, updateExhibitor, deleteExhibitor } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const all = getExhibitors();
  const exhibitor = all.find((e) => e.id === id);
  if (!exhibitor) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(exhibitor);
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
    const existing = getExhibitors().find(e => e.id === id);
    const updated = updateExhibitor(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(updated);
  } catch (err) {
    console.error("Update exhibitor error:", err);
    return Response.json({ error: "Failed to update exhibitor" }, { status: 500 });
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
    const existing = getExhibitors().find(e => e.id === id);
    const updated = updateExhibitor(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(updated);
  } catch (err) {
    console.error("Update exhibitor error:", err);
    return Response.json({ error: "Failed to update exhibitor" }, { status: 500 });
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
    const deleted = deleteExhibitor(id);
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Delete exhibitor error:", err);
    return Response.json({ error: "Failed to delete exhibitor" }, { status: 500 });
  }
}
