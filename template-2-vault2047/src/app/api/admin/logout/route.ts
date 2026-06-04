import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type SessionData } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.destroy();
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Logout error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
