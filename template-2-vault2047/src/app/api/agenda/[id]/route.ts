import { NextRequest } from "next/server";
import { getAgenda, updateAgendaItem, deleteAgendaItem } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = await req.json();
    const existing = getAgenda().find(a => a.id === id);
    const item = updateAgendaItem(id, data);
    if (!item) return Response.json({ error: "Not found" }, { status: 404 });
    if (data.status === "approved" && existing?.status !== "approved") {
      revalidatePath("/");
    }
    return Response.json(item);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const ok = deleteAgendaItem(id);
    if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
