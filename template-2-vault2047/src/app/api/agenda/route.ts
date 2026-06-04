import { NextRequest } from "next/server";
import { getAgenda, getActiveAgenda, addAgendaItem } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  return Response.json(all ? getAgenda() : getActiveAgenda());
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const data = await req.json();
    const item = addAgendaItem(data);
    return Response.json(item, { status: 201 });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
