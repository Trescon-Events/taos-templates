import { NextRequest } from "next/server";
import { getUsers, addUser } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const users = getUsers().map(u => ({ ...u, password: "••••••••" }));
    return Response.json(users);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (session.role !== "super_admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    const data = await req.json();
    const user = addUser(data);
    return Response.json({ ...user, password: "••••••••" }, { status: 201 });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
