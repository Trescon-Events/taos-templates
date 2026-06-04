import { NextRequest } from "next/server";
import { getPartners, getActivePartners, addPartner } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  const data = all ? getPartners() : getActivePartners();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const partner = addPartner(body);
    return Response.json(partner, { status: 201 });
  } catch (err) {
    console.error("Add partner error:", err);
    return Response.json({ error: "Failed to create partner" }, { status: 500 });
  }
}
