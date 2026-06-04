import { NextRequest } from "next/server";
import { reorderIndustrySectors } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body.ids)) {
      return Response.json({ error: "ids must be an array" }, { status: 400 });
    }
    const sectors = reorderIndustrySectors(body.ids as string[]);
    return Response.json(sectors);
  } catch (err) {
    console.error("Reorder industry sectors error:", err);
    return Response.json({ error: "Failed to reorder sectors" }, { status: 500 });
  }
}
