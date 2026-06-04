import { NextRequest } from "next/server";
import { getExhibitors, getActiveExhibitors, addExhibitor } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  const data = all ? getExhibitors() : getActiveExhibitors();
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
    const exhibitor = addExhibitor(body);
    return Response.json(exhibitor, { status: 201 });
  } catch (err) {
    console.error("Add exhibitor error:", err);
    return Response.json({ error: "Failed to create exhibitor" }, { status: 500 });
  }
}
