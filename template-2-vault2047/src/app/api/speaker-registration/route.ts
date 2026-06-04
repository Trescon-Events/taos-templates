import { NextRequest } from "next/server";
import { addSpeaker } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const speaker = addSpeaker({
      name: body.name ?? "",
      role: body.role ?? "",
      org: body.org ?? "",
      country: body.country ?? "",
      countryFlag: body.countryFlag ?? "",
      tier: body.tier ?? "national",
      session: body.session ?? "",
      photo: body.photo ?? "",
      bio: body.bio ?? "",
      linkedin: body.linkedin ?? "",
      status: "pending",
      rejectionNote: "",
      active: false,
      phone: body.phone ?? "",
      dialCode: body.dialCode ?? "",
      email: body.email ?? "",
      company: body.company ?? "",
      industry: body.industry ?? "",
      city: body.city ?? "",
      companyLogo: body.companyLogo ?? "",
      quote: body.quote ?? "",
      assistantName: body.assistantName ?? "",
      assistantEmail: body.assistantEmail ?? "",
      assistantPhone: body.assistantPhone ?? "",
    });

    return Response.json(speaker, { status: 201 });
  } catch (err) {
    console.error("Speaker registration error:", err);
    return Response.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
