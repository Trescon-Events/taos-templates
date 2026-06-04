import { cookies } from "next/headers";
import { type SessionOptions } from "iron-session";
import { readFileSync } from "fs";
import { join } from "path";
import type { User } from "@/types";

export interface SessionData {
  isAdmin: boolean;
  userId: string;
  username: string;
  role: string;
  permissions: User["permissions"];
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "vault2047_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
  },
};

export function getUsers(): User[] {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), "data/users.json"), "utf-8"));
  } catch {
    return [];
  }
}

export async function getSessionData(): Promise<SessionData | null> {
  try {
    const { getIronSession } = await import("iron-session");
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    if (!session.isAdmin) return null;
    return session;
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await getSessionData();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requirePermission(module: keyof User["permissions"]): Promise<SessionData> {
  const session = await requireAdmin();
  if (session.role === "super_admin") return session;
  if (!session.permissions[module]) throw new Error("Forbidden");
  return session;
}
