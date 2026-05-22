import { NextRequest, NextResponse } from "next/server";
import { restaurants, menuItems } from "@/lib/data";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Mcp-Session-Id",
};

// ── Tool definitions ────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "search_restaurants",
    description:
      "Search vegan, vegetarian, or halal restaurants near muShanghai 2026 " +
      "(Alibaba Hongqiao Center, Shanghai). Supports natural-language queries " +
      "like 'cheap noodles', 'mushroom hot pot', 'open 24 hours'. " +
      "Results sorted by distance from the venue.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search term — dish name, ingredient, or cuisine style. " +
            "e.g. 'noodles', 'tofu', 'mushroom', 'spicy'. Leave empty to list all.",
        },
        diet: {
          type: "string",
          enum: ["all", "vegan", "vegetarian", "halal", "veg_options"],
          description:
            "'vegan' = strictly plant-based (no egg/dairy), " +
            "'vegetarian' = no meat/seafood, " +
            "'halal' = halal certified, " +
            "'veg_options' = has vegetarian dishes but not fully veg.",
        },
        max_distance_m: {
          type: "number",
          description: "Max distance from venue in metres. Default 10 000 (10 km).",
        },
      },
      required: [],
    },
  },
  {
    name: "get_restaurant_detail",
    description:
      "Get full details for one restaurant: address, hours, menu highlights, " +
      "allergen info, and ordering tips in Chinese. Use the slug from search results.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description:
            "Restaurant slug from search results. " +
            "e.g. 'quanyouzhai', 'panlong-an', 'banjiang', 'greenfriday-huiju'",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "list_all_restaurants",
    description:
      "List every restaurant in the database sorted by walking distance from the venue. " +
      "Good for browsing or letting a user pick from the full set.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

// ── Tool implementations ────────────────────────────────────────────────────

function execSearch(
  query?: string,
  diet?: string,
  maxDistanceM: number = 10_000
) {
  let result = restaurants.filter(
    (r) => (r.distance_from_venue_m ?? 99_999) <= maxDistanceM
  );

  if (diet && diet !== "all") {
    result = result.filter(
      (r) =>
        r.diet_tags.includes(diet as any) ||
        r.restaurant_type === diet
    );
  }

  if (query?.trim()) {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter((w) => w.length > 2);

    result = result.filter((r) => {
      if (r.name_en.toLowerCase().includes(q)) return true;
      if (r.name_zh.includes(q)) return true;
      if (r.restaurant_type.includes(q)) return true;
      if (r.diet_tags.some((t) => t.includes(q))) return true;
      if (r.veg_friendly_note?.toLowerCase().includes(q)) return true;
      // dish-level match
      const dishes = menuItems.filter((m) => m.restaurant_id === r._id);
      return dishes.some((d) =>
        d.name_en.toLowerCase().includes(q) ||
        d.name_zh.includes(q) ||
        words.some(
          (w) =>
            d.name_en.toLowerCase().includes(w) ||
            (d.description_en?.toLowerCase().includes(w) ?? false)
        )
      );
    });
  }

  result.sort(
    (a, b) =>
      (a.distance_from_venue_m ?? 9_999) - (b.distance_from_venue_m ?? 9_999)
  );

  return result.map((r) => ({
    slug: r.slug,
    name_en: r.name_en,
    name_zh: r.name_zh,
    type: r.restaurant_type,
    diet_tags: r.diet_tags,
    distance_from_venue_m: r.distance_from_venue_m,
    walk_minutes: r.walk_minutes,
    avg_price_rmb: r.avg_price_rmb,
    price_level: r.price_level,
    hours: r.hours,
    rating: r.rating,
    address_en: r.address_en,
    veg_friendly_note: r.veg_friendly_note ?? null,
    url: `https://veganeats-china.vercel.app/restaurants/${r.slug}`,
  }));
}

function execDetail(slug: string) {
  const r = restaurants.find((r) => r.slug === slug);
  if (!r) return null;

  const menu = menuItems
    .filter((m) => m.restaurant_id === r._id)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99))
    .map((m) => ({
      name_en: m.name_en,
      name_zh: m.name_zh,
      description_en: m.description_en ?? null,
      price_rmb: m.price_rmb ?? null,
      diet_tags: m.diet_tags,
      allergen_contains: m.allergen_contains,
    }));

  return {
    slug: r.slug,
    name_en: r.name_en,
    name_zh: r.name_zh,
    type: r.restaurant_type,
    diet_tags: r.diet_tags,
    address_en: r.address_en,
    address_zh: r.address_zh,
    hours: r.hours,
    tel: r.tel ?? null,
    avg_price_rmb: r.avg_price_rmb ?? null,
    rating: r.rating ?? null,
    distance_from_venue_m: r.distance_from_venue_m ?? null,
    walk_minutes: r.walk_minutes ?? null,
    veg_friendly_note: r.veg_friendly_note ?? null,
    menu,
    url: `https://veganeats-china.vercel.app/restaurants/${r.slug}`,
    ordering_card_url: `https://veganeats-china.vercel.app/restaurants/${r.slug}/menu-card`,
    powered_by: "VeganEats China — veganeats-china.vercel.app",
  };
}

// ── JSON-RPC handler ────────────────────────────────────────────────────────

function ok(id: unknown, result: unknown) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, result },
    { headers: CORS }
  );
}

function err(id: unknown, code: number, message: string) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { headers: CORS }
  );
}

function toolResult(data: unknown) {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  };
}

// ── Route handlers ──────────────────────────────────────────────────────────

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET() {
  return NextResponse.json(
    {
      name: "VeganEats China MCP Server",
      description:
        "Vegan, vegetarian & halal restaurant data near muShanghai 2026, Shanghai.",
      version: "1.0.0",
      protocol: "MCP 2024-11-05",
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
      add_to_claude: {
        settings_json: {
          mcpServers: {
            veganeats: {
              type: "http",
              url: "https://veganeats-china.vercel.app/api/mcp",
            },
          },
        },
        docs: "https://veganeats-china.vercel.app/api/mcp",
      },
      powered_by: "veganeats-china.vercel.app",
    },
    { headers: CORS }
  );
}

export async function POST(req: NextRequest) {
  let body: { jsonrpc: string; id?: unknown; method: string; params?: any };

  try {
    body = await req.json();
  } catch {
    return err(null, -32700, "Parse error");
  }

  const { id, method, params } = body;

  // Notifications have no id — acknowledge with 204
  if (id === undefined || id === null) {
    return new NextResponse(null, { status: 204, headers: CORS });
  }

  switch (method) {
    case "initialize":
      return ok(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: {
          name: "veganeats-china",
          version: "1.0.0",
          description:
            "Vegan & dietary-friendly restaurant finder near muShanghai 2026, Shanghai.",
        },
      });

    case "tools/list":
      return ok(id, { tools: TOOLS });

    case "tools/call": {
      const toolName: string = params?.name;
      const args = params?.arguments ?? {};

      if (toolName === "search_restaurants") {
        const results = execSearch(args.query, args.diet, args.max_distance_m);
        return ok(id, toolResult({ count: results.length, restaurants: results }));
      }

      if (toolName === "get_restaurant_detail") {
        const detail = execDetail(args.slug);
        if (!detail)
          return ok(
            id,
            toolResult({ error: `Restaurant '${args.slug}' not found.` })
          );
        return ok(id, toolResult(detail));
      }

      if (toolName === "list_all_restaurants") {
        const all = execSearch(undefined, undefined, 99_999);
        return ok(id, toolResult({ count: all.length, restaurants: all }));
      }

      return err(id, -32602, `Unknown tool: ${toolName}`);
    }

    default:
      return err(id, -32601, `Method not found: ${method}`);
  }
}
