import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Media Partners | Finance 2045 Jakarta, 7–8 July 2026",
  description: "Official media partners of Finance 2045 — Southeast Asia's preeminent financial summit.",
};

export const revalidate = 300;

interface Entity {
  id: number;
  entity_name: string;
  website_url: string | null;
  image_url: string;
}

interface Category {
  category_id: number;
  category_name: string;
  category_order: number;
  entity: Entity[];
}

async function getMediaPartners(): Promise<{ categories: { name: string; items: Entity[] }[] }> {
  try {
    const res = await fetch("https://api.konfhub.com/event/public/wais-f45-indonesia/entity/2", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { categories: [] };
    const data: { categorized: Category[]; uncategorized: Entity[] } = await res.json();

    const f45Media = data.categorized
      .filter(
        (c) =>
          c.category_name.startsWith("Finance 2045") &&
          (c.category_name.toLowerCase().includes("media") ||
            c.category_name.toLowerCase().includes("official"))
      )
      .sort((a, b) => a.category_order - b.category_order)
      .map((c) => ({
        name: c.category_name.replace("Finance 2045 || ", "").replace("Finance 2045 |", "").trim(),
        items: c.entity,
      }))
      .filter((c) => c.items.length > 0);

    return { categories: f45Media };
  } catch {
    return { categories: [] };
  }
}

export default async function MediaPartnersPage() {
  const { categories } = await getMediaPartners();
  const total = categories.reduce((s, c) => s + c.items.length, 0);

  return (
    <>
      <style>{`
        .pt-page { min-height: 100vh; background: var(--bg-primary); padding-top: 72px; }
        .pt-hero { padding: 72px 40px 56px; text-align: center; border-bottom: 1px solid var(--border); background: linear-gradient(180deg, rgba(0,165,163,0.05) 0%, transparent 100%); }
        .pt-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 18px; }
        .pt-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 900; letter-spacing: -0.03em; color: #fff; margin-bottom: 14px; }
        .pt-hero h1 span { color: var(--gold); }
        .pt-hero p { font-size: 15px; color: var(--text-muted); max-width: 500px; margin: 0 auto; line-height: 1.7; }
        .pt-body { max-width: 1100px; margin: 0 auto; padding: 64px 40px 100px; }
        .pt-cat-label { font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal); margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .pt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 56px; }
        .pt-card { background: #fff; border: 1px solid #e5e7eb; padding: 32px 24px; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: border-color 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .pt-card:hover { border-color: rgba(0,165,163,0.50); box-shadow: 0 0 24px rgba(0,165,163,0.15); }
        .pt-logo { width: 140px; height: 64px; position: relative; }
        .pt-name { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.72); color: #fff; font-size: 11px; font-weight: 600; text-align: center; letter-spacing: 0.04em; padding: 8px 10px; opacity: 0; transform: translateY(4px); transition: opacity 0.2s, transform 0.2s; }
        .pt-card:hover .pt-name { opacity: 1; transform: translateY(0); }
        .pt-empty { text-align: center; padding: 80px 40px; color: var(--text-muted); font-size: 15px; }
        @media (max-width: 640px) { .pt-hero { padding: 52px 24px 40px; } .pt-body { padding: 40px 20px 80px; } .pt-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <div className="pt-page">
        <div className="pt-hero">
          <div className="pt-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
            Partners · Media
          </div>
          <h1>Media <span>Partners</span></h1>
          <p>
            {total > 0
              ? `${total} confirmed media partner${total > 1 ? "s" : ""} covering Finance 2045, Jakarta, 7–8 July 2026.`
              : "Media partner announcements coming soon."}
          </p>
        </div>

        <div className="pt-body">
          {categories.length === 0 ? (
            <div className="pt-empty">Media partner announcements coming soon.</div>
          ) : (
            categories.map((cat) => (
              <div key={cat.name}>
                <div className="pt-cat-label">{cat.name}</div>
                <div className="pt-grid">
                  {cat.items.map((e) => (
                    <a
                      key={e.id}
                      href={e.website_url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-card"
                    >
                      <div className="pt-logo">
                        <Image src={e.image_url} alt={e.entity_name} fill sizes="140px" style={{ objectFit: "contain" }} />
                      </div>
                      <div className="pt-name">{e.entity_name}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
