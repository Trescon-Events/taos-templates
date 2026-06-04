import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Honeypot check
    if (body._hp) return NextResponse.json({ ok: true }); // silently accept spam
    // TODO: wire to CRM (HubSpot / Salesforce) when ready
    console.log("[enquire]", body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
