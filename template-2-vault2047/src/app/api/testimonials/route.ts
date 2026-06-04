import { NextRequest } from "next/server";
import { getTestimonials, getActiveTestimonials, addTestimonial } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all") === "true";
  const data = all ? getTestimonials() : getActiveTestimonials();
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
    const testimonial = addTestimonial(body);
    return Response.json(testimonial, { status: 201 });
  } catch (err) {
    console.error("Add testimonial error:", err);
    return Response.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
