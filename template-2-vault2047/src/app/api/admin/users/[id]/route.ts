import { NextRequest } from "next/server";
import { updateUser, deleteUser } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (session.role !== "super_admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = await params;
    const data = await req.json();
    const user = updateUser(id, data);
    if (!user) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ...user, password: "••••••••" });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin();
    if (session.role !== "super_admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = await params;
    const ok = deleteUser(id);
    if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
