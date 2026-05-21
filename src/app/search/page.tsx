"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { restaurants, menuItems } from "@/lib/data";
import { DIET_CONFIG, TYPE_CONFIG } from "@/lib/types";
import type { Restaurant } from "@/lib/types";

// Keyword → diet tags / types mapping for smart matching
const KEYWORD_MAP: Record<string, string[]> = {
  vegan: ["vegan"], vegetarian: ["vegetarian"], halal: ["halal"],
  "veg options": ["veg_options"], "soup noodle": ["noodles", "temple"],
  noodle: ["noodles", "temple"], noodles: ["noodles", "temple"],
  tofu: ["vegan", "vegetarian"], mushroom: ["vegan", "dedicated_veg"],
  "hot pot": ["veg_friendly", "dedicated_veg"], hotpot: ["veg_friendly"],
  spicy: ["veg_friendly"], temple: ["temple"], "dim sum": ["dedicated_veg"],
  rice: ["halal", "dedicated_veg"], xinjiang: ["halal"],
  "matcha ice cream": ["dedicated_veg"], dessert: ["dedicated_veg"],
  cheap: ["price_1"], affordable: ["price_1"], budget: ["price_1"],
  lunch: ["temple", "noodles"], breakfast: ["temple"],
  "open 24": ["24h"], "24 hours": ["24h"], "24h": ["24h"],
};

// Pre-build a map of restaurant_id → menu items for O(1) lookup
const menuByRestaurant = menuItems.reduce<Record<string, typeof menuItems>>((acc, item) => {
  if (!acc[item.restaurant_id]) acc[item.restaurant_id] = [];
  acc[item.restaurant_id].push(item);
  return acc;
}, {});

function scoreRestaurant(r: Restaurant, query: string): { score: number; matchReason: string; matchedDish?: string } {
  const q = query.toLowerCase();
  const words = q.split(/\s+/);
  let score = 0;
  let matchReason = "";
  let matchedDish: string | undefined;

  // Direct name match
  if (r.name_en.toLowerCase().includes(q)) { score += 10; matchReason = "name match"; }
  if (r.name_zh.includes(q)) { score += 10; matchReason = "name match"; }

  // Dish-level match
  const dishes = menuByRestaurant[r._id] ?? [];
  for (const dish of dishes) {
    const nameMatch = dish.name_en.toLowerCase().includes(q) || dish.name_zh.includes(q);
    const wordMatch = words.some(w => w.length > 2 && (
      dish.name_en.toLowerCase().includes(w) || dish.name_zh.includes(w) ||
      (dish.description_en?.toLowerCase().includes(w) ?? false)
    ));
    if (nameMatch) { score += 8; matchedDish = matchedDish ?? dish.name_en; break; }
    if (wordMatch && score < 5) { score += 4; matchedDish = matchedDish ?? dish.name_en; }
  }
  if (matchedDish) matchReason = matchReason || `has dish: ${matchedDish}`;

  // Keyword → type/tag matching
  for (const [kw, targets] of Object.entries(KEYWORD_MAP)) {
    if (q.includes(kw) || words.some(w => kw.includes(w))) {
      for (const target of targets) {
        if (r.restaurant_type === target) { score += 5; matchReason = matchReason || kw; }
        if (r.diet_tags.includes(target as any)) { score += 4; matchReason = matchReason || kw; }
        if (r.special_type === target) { score += 6; matchReason = matchReason || kw; }
      }
    }
  }

  // Price matching
  if ((q.includes("cheap") || q.includes("budget") || q.includes("affordable")) && r.price_level === 1) {
    score += 4; matchReason = matchReason || "budget friendly";
  }

  // 24h matching
  if ((q.includes("24") || q.includes("late night") || q.includes("midnight")) &&
    r.hours.daily?.toLowerCase().includes("24")) {
    score += 8; matchReason = "open 24 hours";
  }

  // Open now / lunch / breakfast hints
  if (q.includes("breakfast") && r.hours.daily?.startsWith("07")) { score += 3; }
  if (q.includes("lunch") && r.hours.daily) { score += 2; }

  // Partial word match in name
  for (const word of words) {
    if (word.length > 2) {
      if (r.name_en.toLowerCase().includes(word)) score += 2;
      if (r.name_zh.includes(word)) score += 2;
      if (r.address_en.toLowerCase().includes(word)) score += 1;
    }
  }

  return { score, matchReason, matchedDish };
}

function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [inputVal, setInputVal] = useState(q);

  const results = restaurants
    .map((r) => ({ r, ...scoreRestaurant(r, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || (a.r.distance_from_venue_m ?? 9999) - (b.r.distance_from_venue_m ?? 9999));

  const RELATED = ["vegan noodles", "tofu", "halal", "mushroom", "budget", "open 24h"];

  return (
    <div className="px-4 pb-10" style={{ background: "#F7F5F0", minHeight: "100%" }}>
      {/* Search bar */}
      <form className="pt-4 mb-4" onSubmit={(e) => {
        e.preventDefault();
        if (inputVal.trim()) router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
      }}>
        <div className="relative">
          <Link href="/" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">←</Link>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full h-12 pl-9 pr-4 rounded-xl bg-white border border-gray-100 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-100"
            autoFocus
          />
        </div>
      </form>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-3">
        {results.length > 0
          ? <><strong>{results.length}</strong> {results.length === 1 ? "restaurant" : "restaurants"} match <strong>"{q}"</strong></>
          : <>No results for <strong>"{q}"</strong></>
        }
      </p>

      {/* Result cards */}
      {results.map(({ r, matchReason }) => {
        const typeInfo = TYPE_CONFIG[r.restaurant_type];
        const thumb = r.photos?.[0];

        return (
          <Link href={`/restaurants/${r.slug}`} key={r._id} className="block mb-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm active:scale-[0.99] transition-transform">
              {/* Photo banner */}
              {thumb && (
                <div className="w-full overflow-hidden" style={{ height: 140 }}>
                  <img src={thumb} alt={r.name_en}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                  />
                </div>
              )}

              <div className="p-3">
                {/* Match reason badge */}
                {matchReason && (
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-1.5 font-medium"
                    style={{ background: "#EAF4EE", color: "#2D6A4F" }}>
                    ✓ matches "{matchReason}"
                  </span>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-900 leading-tight">{r.name_en}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{r.name_zh}</p>
                  </div>
                  <span className="text-gray-300">›</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    {typeInfo.icon} {typeInfo.label}
                  </span>
                  {r.diet_tags.map((tag) => {
                    const cfg = DIET_CONFIG[tag as keyof typeof DIET_CONFIG];
                    if (!cfg) return null;
                    return (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: cfg.bg, color: cfg.color }}>
                        {cfg.label}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  {r.distance_from_venue_m && (
                    <span>📍 {(r.distance_from_venue_m / 1000).toFixed(1)}km</span>
                  )}
                  {r.rating && <span>⭐ {r.rating}</span>}
                  {r.hours.daily && <span>🕐 {r.hours.daily}</span>}
                  {r.price_level && <span>{"¥".repeat(r.price_level)}</span>}
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      {/* No results */}
      {results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-4xl mb-3">🌿</p>
          <p className="text-gray-500 text-sm mb-1">No exact matches found.</p>
          <p className="text-gray-400 text-xs mb-6">Try browsing all restaurants instead.</p>
          <Link href="/restaurants"
            className="inline-block px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: "#2D6A4F" }}>
            Browse All Restaurants
          </Link>
        </div>
      )}

      {/* Related searches */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Also try</p>
        <div className="flex flex-wrap gap-2">
          {RELATED.filter(s => s !== q).map((s) => (
            <button key={s}
              onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
