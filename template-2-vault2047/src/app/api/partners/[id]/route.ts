import { NextRequest } from "next/server";
import { getPartners, updatePartner, deletePartner } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const all = getPartners();
  const partner = all.find((p) => p.id === id);
  if (!partner) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(partner);
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
    const existing = getPartners().find(p => p.id === id);
    const updated = updatePartner(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(updated);
  } catch (err) {
    console.error("Update partner error:", err);
    return Response.json({ error: "Failed to update partner" }, { status: 500 });
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
    const existing = getPartners().find(p => p.id === id);
    const updated = updatePartner(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(updated);
  } catch (err) {
    console.error("Update partner error:", err);
    return Response.json({ error: "Failed to update partner" }, { status: 500 });
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
    const deleted = deletePartner(id);
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Delete partner error:", err);
    return Response.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
