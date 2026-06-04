import { NextResponse } from "next/server";

const BASE = "https://api.konfhub.com";
const EVENT_URL = "world-cx-summit-awards";

export type KonfPartner = {
  name: string;
  logo: string;
  category: string;
  desc: string;
};

export type SponsorCategory = {
  name: string;
  order: number;
  sponsors: KonfPartner[];
};

async function fetchEntityGrouped(entityId: number): Promise<SponsorCategory[]> {
  const res = await fetch(
    `${BASE}/event/public/${EVENT_URL}/entity/${entityId}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = await res.json() as Record<string, unknown>;

  const categories: SponsorCategory[] = [];

  if (Array.isArray(data.categorized)) {
    for (const cat of data.categorized as Record<string, unknown>[]) {
      const name = String(cat.category_name ?? cat.name ?? "");
      const order = Number(cat.category_order ?? 0);
      const list = (cat.entity ?? cat.sponsors ?? cat.entities ?? cat.items ?? []) as Record<string, unknown>[];

      const sponsors: KonfPartner[] = list
        .map((r) => {
          const sponsorName = String(r.entity_name ?? r.name ?? r.company_name ?? "");
          if (!sponsorName) return null;
          return {
            name: sponsorName,
            logo: String(r.image_url ?? r.logo_url ?? r.logo ?? r.image ?? ""),
            category: name,
            desc: String(r.description ?? r.about ?? r.bio ?? ""),
          };
        })
        .filter(Boolean) as KonfPartner[];

      if (sponsors.length > 0) {
        categories.push({ name, order, sponsors });
      }
    }
  }

  // Sort by KonfHub category_order
  categories.sort((a, b) => a.order - b.order);

  return categories;
}

async function fetchEntityFlat(entityId: number): Promise<KonfPartner[]> {
  const res = await fetch(
    `${BASE}/event/public/${EVENT_URL}/entity/${entityId}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = await res.json() as Record<string, unknown>;

  const items: KonfPartner[] = [];
  if (Array.isArray(data.categorized)) {
    for (const cat of data.categorized as Record<string, unknown>[]) {
      const catName = String(cat.category_name ?? cat.name ?? "");
      const list = (cat.entity ?? cat.sponsors ?? cat.entities ?? cat.items ?? []) as Record<string, unknown>[];
      for (const r of list) {
        const name = String(r.entity_name ?? r.name ?? r.company_name ?? "");
        if (!name) continue;
        items.push({
          name,
          logo: String(r.image_url ?? r.logo_url ?? r.logo ?? r.image ?? ""),
          category: catName,
          desc: String(r.description ?? r.about ?? r.bio ?? ""),
        });
      }
    }
  }
  return items;
}

export async function GET() {
  try {
    const [sponsorCategories, mediaPartners, exhibitors] = await Promise.all([
      fetchEntityGrouped(1),
      fetchEntityFlat(2),
      fetchEntityFlat(3),
    ]);

    return NextResponse.json({ sponsorCategories, mediaPartners, exhibitors });
  } catch (err) {
    console.error("KonfHub partners fetch error:", err);
    return NextResponse.json(
      { sponsorCategories: [], mediaPartners: [], exhibitors: [], error: "fetch_failed" },
      { status: 200 }
    );
  }
}
