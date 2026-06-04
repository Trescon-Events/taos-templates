import { NextRequest } from "next/server";
import { getSpeakers, getActiveSpeakers, addSpeaker } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  const data = all ? getSpeakers() : getActiveSpeakers();
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
    const speaker = addSpeaker(body);
    return Response.json(speaker, { status: 201 });
  } catch (err) {
    console.error("Add speaker error:", err);
    return Response.json({ error: "Failed to create speaker" }, { status: 500 });
  }
}
