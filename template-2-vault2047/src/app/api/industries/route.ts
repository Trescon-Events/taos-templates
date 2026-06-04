import { NextRequest } from "next/server";
import { getIndustrySectors, addIndustrySector } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  const sectors = getIndustrySectors();
  const data = all ? sectors : sectors.filter((s) => s.active);
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
    const sector = addIndustrySector({ label: body.label, active: body.active ?? true });
    return Response.json(sector, { status: 201 });
  } catch (err) {
    console.error("Add industry sector error:", err);
    return Response.json({ error: "Failed to create sector" }, { status: 500 });
  }
}
