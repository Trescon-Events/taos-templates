import { getSpeakers, getPartners, getExhibitors, getTestimonials, getBlogs, getAgenda } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const count =
      getSpeakers().filter(i => i.status === "pending").length +
      getPartners().filter(i => i.status === "pending").length +
      getExhibitors().filter(i => i.status === "pending").length +
      getTestimonials().filter(i => i.status === "pending").length +
      getBlogs().filter(i => i.status === "pending").length +
      getAgenda().filter(i => i.status === "pending").length;
    return Response.json({ count });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
