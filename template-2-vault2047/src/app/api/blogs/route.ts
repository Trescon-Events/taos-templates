import { NextRequest } from "next/server";
import { getBlogs, getActiveBlogs, addBlog } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  const data = all ? getBlogs() : getActiveBlogs();
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
    const blog = addBlog(body);
    return Response.json(blog, { status: 201 });
  } catch (err) {
    console.error("Add blog error:", err);
    return Response.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
