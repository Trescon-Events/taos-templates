# TAOS Event Site Templates

5 production-ready event website templates extracted from live Trescon events.

## Templates

| # | Template | Event | Style | Best for |
|---|----------|-------|-------|----------|
| 1 | `template-1-finance2045` | Finance 2045 | Dark, glassmorphism, teal+gold | Finance, BFSI, investment |
| 2 | `template-2-vault2047` | Vault 2047 | Cyber dark, copper shimmer, admin panel | Cybersecurity, tech, enterprise |
| 3 | `template-3-world-cx-summit` | World CX Summit | Navy+teal+gold, awards, clean | CX, enterprise, awards |
| 4 | `template-4-world-ai-show` | World AI Show | Light bg, data streams, parallax | AI, innovation, unique aesthetic |
| 5 | `template-5-big-cio-show` | Big CIO Show | Dark corporate, CIO/awards, themes grid | CIO/CISO events, IT leadership |

## How to use

### Step 1: Choose a template in TAOS

In the TAOS website builder → **Template** tab → select a template → **Generate event.ts Config**

TAOS pulls all event data (brand colours, logos from Supabase, speakers, agenda, sponsors) and generates a ready-to-edit `event.ts` config file.

### Step 2: Clone the template locally

```bash
cp -r ~/taos-templates/template-1-finance2045 ~/my-events/my-new-event
cd ~/my-events/my-new-event
npm install
```

### Step 3: Drop in the config

Copy the generated `event.ts` content from TAOS into `src/config/event.ts`.

### Step 4: Preview

```bash
npm run dev
```

### Step 5: Customise in Claude Code

Open the project in Claude Code and ask it to edit anything:
- Change hero headline / subheadline
- Add/remove sections
- Update colours / fonts
- Add custom sections

### Step 6: Deploy to Cloudflare

```bash
npx opennextjs-cloudflare build
npx wrangler deploy
```

## Config file structure

Every template has `src/config/event.ts` with:

```ts
export const EVENT = {
  name, short_name, tagline, description, edition, organiser,
  date_display, date_iso_start, date_iso_end,
  venue_name, venue_city, venue_country, venue_display, venue_address,
  site_url, register_url, enquire_url,
  cta_primary_label, cta_secondary_label,
  colors: { bg_primary, accent, highlight, ... },
  assets: { logo, logo_white, hero_video, hero_poster, og_image },
  stats: [{ num/target, label }],
  nav_items: [{ label, href }],
  footer: { tagline, email, social, columns, copyright },
  fonts: { heading, body, google_import },
  seo: { title_default, title_template, keywords },
  _template: { id, label, description, tech, pages }
}
```

Changing any value in this file instantly updates the entire site.
