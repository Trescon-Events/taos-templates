import { NextRequest } from "next/server";

// Proxies an external image URL so the crop editor can load it without CORS errors.
// Only used inside the admin dashboard — no auth check needed beyond being on localhost/admin.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });

  // Only allow http/https image URLs
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return new Response("Invalid protocol", { status: 400 });
  }

  try {
    const upstream = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return new Response("Not an image", { status: 400 });
    }
    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("Failed to fetch image", { status: 502 });
  }
}
