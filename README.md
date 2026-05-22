# VeganEats China 🌿

**Find vegan, vegetarian, and halal food near muShanghai 2026 — without knowing a word of Chinese.**

🔗 **Live:** [veganeats-china.vercel.app](https://veganeats-china.vercel.app)

---

## The Problem

You're at an international health & wellness event in Shanghai. You're vegan, or vegetarian, or halal, or you have allergies. You open a menu and it's entirely in Chinese. You ask the server — language barrier. You search Google Maps — results are generic, unreliable, and designed for locals.

VeganEats China is built for exactly this gap.

---

## Who It's For

**Primary users:** International participants at [muShanghai 2026](https://mushanghai.com) (May 10 – Jun 6, Alibaba Hongqiao Center, Shanghai) who follow plant-based, vegetarian, halal, or allergy-aware diets and don't read Chinese.

**The tool works best for people who:**
- Are vegan or vegetarian traveling in China for the first time
- Follow halal dietary requirements
- Have food allergies and need ingredient transparency
- Want to eat well but can't navigate Chinese restaurant culture alone

---

## What It Does

- **Search by dish or ingredient** — "soup noodle", "mushroom", "tofu", "open 24h"
- **Map & list views** — all 13 restaurants plotted with walking distance from the venue
- **Diet filters** — Vegan · Vegetarian · Halal · Veg Options
- **Ordering cards** — show your server a card in Chinese that explains exactly what you can't eat (three versions: vegan / vegetarian / halal)
- **Real reviews** — hand-curated from 小红书 (Xiaohongshu), filtered for authenticity, displayed in English
- **Menu highlights** — key dishes with prices and allergen info for each restaurant
- **Share** — native share sheet (works like Google Maps) to send a restaurant to a friend

---

## Philosophy

**Human-curated, not scraped.** Every restaurant is manually verified. Every review is individually read and judged — ads and paid promotions are filtered out before anything goes live.

**Honest over promotional.** Mixed reviews stay in. A reviewer saying "the noodles were average" is more useful than five stars from someone who got a discount.

**No data collected.** No login, no cookies, no tracking beyond anonymous page-view counts. You use it, you leave, nothing is stored about you.

**AI-native from day one.** The dataset is exposed as a proper MCP server — structured for LLMs, not just browsers. If you're querying from Claude Code, you get the same data as a website visitor, just in a format your tools can reason about.

---

## Data

13 restaurants within ~7km of Alibaba Hongqiao Center, covering:

| Type | Count |
|------|-------|
| 🌿 Fully vegetarian / vegan | 7 |
| 🏯 Temple dining (Buddhist veg) | 2 |
| 🥗 Vegetarian-friendly (veg options) | 3 |
| 🕌 Halal | 2 |

~90 menu items with English names, descriptions, prices, and allergen flags.
Reviews sourced from 小红书, translated to English, author nicknames anonymized.

All data lives in [`src/lib/data.ts`](src/lib/data.ts) — readable, auditable, forkable.

---

## For Users

Just open the link on your phone. No app install, no account.

**[veganeats-china.vercel.app](https://veganeats-china.vercel.app)**

Works on iOS Safari and Android Chrome. Designed for one hand, standing in a restaurant doorway.

---

## For AI Users — MCP Server

VeganEats China exposes a [Model Context Protocol](https://modelcontextprotocol.io) server. If you use Claude Code or any MCP-compatible client, you can query the restaurant data directly from your terminal.

**Add to `~/.claude/settings.json`:**

```json
{
  "mcpServers": {
    "veganeats": {
      "type": "http",
      "url": "https://veganeats-china.vercel.app/api/mcp"
    }
  }
}
```

**Then ask Claude:**
```
Find vegan noodles near muShanghai, under ¥30
What's open for breakfast near the venue?
Get the full menu for Panlong Temple
```

**MCP Tools available:**
| Tool | What it does |
|------|-------------|
| `search_restaurants` | Filter by query, diet type, and max distance |
| `get_restaurant_detail` | Full info + menu for one restaurant |
| `list_all_restaurants` | All 13 sorted by walking distance |

Full schema: [`GET /api/mcp`](https://veganeats-china.vercel.app/api/mcp)

---

## For Developers — REST API

No auth required. CORS open.

```bash
# All restaurants
curl https://veganeats-china.vercel.app/api/restaurants

# Filter by diet
curl https://veganeats-china.vercel.app/api/restaurants?diet=vegan

# Search
curl https://veganeats-china.vercel.app/api/restaurants?q=noodles

# Single restaurant + menu
curl https://veganeats-china.vercel.app/api/restaurants/panlong-an
```

---

## Tech Stack

```
Next.js 14 (App Router)   — framework
TypeScript                 — types
Tailwind CSS               — styling
Vercel                     — hosting + edge deployment
高德地图 (Amap)             — maps (JS API + REST)
Vercel Analytics           — anonymous page views
MCP 2024-11-05            — AI tool protocol
```

No database. No backend server. No auth layer. Data is static TypeScript — zero cold starts, zero infrastructure cost, zero data breach surface.

---

## Running Locally

```bash
git clone https://github.com/0xmandy/veganeats-china
cd veganeats-china
npm install
cp .env.local.example .env.local   # add your Amap keys
npm run dev
```

Open [localhost:3000](http://localhost:3000).

---

## Contributing

**Adding a restaurant or fixing data:** Edit [`src/lib/data.ts`](src/lib/data.ts) and open a PR.

**Adding a review:** Find a genuine user review on 小红书, open an issue with the link and which restaurant it's for. Reviews are added manually after checking for authenticity.

**Reporting wrong info:** [Email](mailto:zqhdingyue@163.com) or open an issue. Hours, addresses, and phone numbers change — we want to know.

---

## License

Data and code are open source. Restaurant names, user reviews, and map data remain the property of their respective owners. Reviews are used under fair-use quotation with attribution links to original posts.

---

*Built for muShanghai 2026 · Shanghai · Made with care for people who just want to eat well.*
