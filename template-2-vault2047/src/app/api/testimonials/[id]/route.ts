import { NextRequest } from "next/server";
import { getTestimonials, updateTestimonial, deleteTestimonial } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const all = getTestimonials();
  const testimonial = all.find((t) => t.id === id);
  if (!testimonial) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(testimonial);
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
    const existing = getTestimonials().find(t => t.id === id);
    const updated = updateTestimonial(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(updated);
  } catch (err) {
    console.error("Update testimonial error:", err);
    return Response.json({ error: "Failed to update testimonial" }, { status: 500 });
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
    const existing = getTestimonials().find(t => t.id === id);
    const updated = updateTestimonial(id, body);
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    if (body.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(updated);
  } catch (err) {
    console.error("Update testimonial error:", err);
    return Response.json({ error: "Failed to update testimonial" }, { status: 500 });
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
    const deleted = deleteTestimonial(id);
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Delete testimonial error:", err);
    return Response.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
