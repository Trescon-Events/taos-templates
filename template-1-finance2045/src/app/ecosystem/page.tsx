import EcosystemClient from "./EcosystemClient";

interface Entity {
  id: string;
  entity_name: string;
  image_url: string;
  website_url: string;
  category_name: string;
  category_order: number;
  entity_order: number;
}

interface ApiResponse {
  categorized: { category_id: string; category_name: string; category_order: number; entity: Entity[] }[];
  uncategorized: Entity[];
}

async function getEntityData(entity: number): Promise<ApiResponse> {
  try {
    const res = await fetch(
      `https://api.konfhub.com/event/public/wais-f45-indonesia/entity/${entity}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return { categorized: [], uncategorized: [] };
    return res.json();
  } catch {
    return { categorized: [], uncategorized: [] };
  }
}

export default async function EcosystemPage() {
  const [sponsorData, partnerData] = await Promise.all([
    getEntityData(1),
    getEntityData(2),
  ]);

  return <EcosystemClient sponsorData={sponsorData} partnerData={partnerData} />;
}
