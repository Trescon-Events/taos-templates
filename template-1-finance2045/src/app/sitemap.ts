import type { MetadataRoute } from "next";

const BASE = "https://www.finance2045.com";

const STATIC_ROUTES: {
  url: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { url: "/",                             priority: 1.0, changeFrequency: "weekly"  },
  { url: "/about",                        priority: 0.9, changeFrequency: "monthly" },
  { url: "/speakers",                     priority: 0.9, changeFrequency: "weekly"  },
  { url: "/agenda",                       priority: 0.9, changeFrequency: "weekly"  },
  { url: "/agenda/themes",                priority: 0.7, changeFrequency: "monthly" },
  { url: "/agenda/full",                  priority: 0.8, changeFrequency: "weekly"  },
  { url: "/partners",                     priority: 0.8, changeFrequency: "weekly"  },
  { url: "/partners/sponsors",            priority: 0.7, changeFrequency: "weekly"  },
  { url: "/partners/exhibitors",          priority: 0.7, changeFrequency: "weekly"  },
  { url: "/partners/media",              priority: 0.6, changeFrequency: "monthly" },
  { url: "/partners/associations",       priority: 0.6, changeFrequency: "monthly" },
  { url: "/startups",                    priority: 0.7, changeFrequency: "monthly" },
  { url: "/startups/pitch-competition",  priority: 0.7, changeFrequency: "monthly" },
  { url: "/networking",                  priority: 0.7, changeFrequency: "monthly" },
  { url: "/networking/ai-matchmaking",   priority: 0.6, changeFrequency: "monthly" },
  { url: "/networking/attendee-app",     priority: 0.5, changeFrequency: "monthly" },
  { url: "/knowledge-hub",              priority: 0.7, changeFrequency: "weekly"  },
  { url: "/blog",                        priority: 0.8, changeFrequency: "weekly"  },
  { url: "/happenings",                  priority: 0.6, changeFrequency: "weekly"  },
  { url: "/attend",                      priority: 0.8, changeFrequency: "monthly" },
  { url: "/attend/delegate",            priority: 0.8, changeFrequency: "monthly" },
  { url: "/attend/sponsor",             priority: 0.8, changeFrequency: "monthly" },
  { url: "/attend/exhibit",             priority: 0.7, changeFrequency: "monthly" },
  { url: "/attend/media",               priority: 0.6, changeFrequency: "monthly" },
  { url: "/attend/association",         priority: 0.6, changeFrequency: "monthly" },
  { url: "/attend/faqs",                priority: 0.5, changeFrequency: "monthly" },
  { url: "/enquire",                     priority: 0.9, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
