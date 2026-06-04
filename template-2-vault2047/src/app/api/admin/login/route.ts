import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, getUsers, type SessionData } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 });
    }

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password && u.active);
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.isAdmin = true;
    session.userId = user.id;
    session.username = user.username;
    session.role = user.role;
    session.permissions = user.permissions;
    await session.save();

    return Response.json({ ok: true, role: user.role, permissions: user.permissions });
  } catch (err) {
    console.error("Login error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
