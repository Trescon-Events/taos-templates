import { NextResponse } from "next/server";

// entity: 1 = sponsor, 2 = partner, 3 = exhibitor
const EVENT_URL = "big-cio-show-awards-2026";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get("type") ?? "1";

  if (!["1", "2", "3"].includes(entity)) {
    return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.konfhub.com/event/public/${EVENT_URL}/entity/${entity}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error(`KonfHub entity API error: ${res.status}`);

    const data = await res.json();

    const categorized = (data.categorized ?? []).map((cat: {
      category_id: number; category_name: string; category_order: number;
      entity: { id: number; entity_name: string; image_url: string; website_url: string; entity_order: number }[];
    }) => ({
      category_id:    cat.category_id,
      category_name:  cat.category_name,
      category_order: cat.category_order,
      entities: cat.entity.map(e => ({
        id:           e.id,
        name:         e.entity_name,
        image:        e.image_url ?? "",
        website:      e.website_url ?? "",
        order:        e.entity_order,
      })),
    }));

    const uncategorized = (data.uncategorized ?? []).map((e: {
      id: number; entity_name: string; image_url: string; website_url: string; entity_order: number;
    }) => ({
      id:      e.id,
      name:    e.entity_name,
      image:   e.image_url ?? "",
      website: e.website_url ?? "",
      order:   e.entity_order,
    }));

    return NextResponse.json({ categorized, uncategorized });
  } catch (err) {
    console.error("Entity API error:", err);
    return NextResponse.json({ categorized: [], uncategorized: [], error: "Failed to load" }, { status: 500 });
  }
}
