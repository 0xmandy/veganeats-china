import Link from "next/link";
import type { Restaurant } from "@/lib/types";
import { DIET_CONFIG, TYPE_CONFIG } from "@/lib/types";

function PriceDots({ level }: { level?: 1 | 2 | 3 }) {
  if (!level) return null;
  return <span className="text-gray-400 text-sm">{"¥".repeat(level)}</span>;
}

export function RestaurantCard({ r }: { r: Restaurant }) {
  const typeInfo = TYPE_CONFIG[r.restaurant_type];
  const isVegFriendly = r.restaurant_type === "veg_friendly";
  const thumb = r.photos?.[0];

  return (
    <Link href={`/restaurants/${r.slug}`} className="block">
      <div className="bg-white rounded-xl p-4 mb-3 shadow-sm active:scale-[0.99] transition-transform">
        {/* Name row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-base leading-tight">{r.name_en}</p>
            <p className="text-gray-400 text-sm mt-0.5">{r.name_zh}</p>
          </div>
          {thumb && (
            <img
              src={thumb}
              alt={r.name_en}
              className="w-16 h-16 rounded-lg object-cover flex-none"
              loading="lazy"
            />
          )}
          {!thumb && <span className="text-gray-300 text-lg mt-0.5">›</span>}
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
          {/* Restaurant type badge */}
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            {typeInfo.icon} {typeInfo.label}
          </span>

          {/* Diet tags */}
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

        {/* Info row */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {r.walk_minutes && (
            <span>🚶 {r.walk_minutes} min</span>
          )}
          {r.distance_from_venue_m && !r.walk_minutes && (
            <span>📍 {(r.distance_from_venue_m / 1000).toFixed(1)}km</span>
          )}
          <PriceDots level={r.price_level} />
          {r.hours.daily && <span>🕐 {r.hours.daily}</span>}
        </div>

        {/* Veg-friendly note */}
        {isVegFriendly && r.veg_friendly_note && (
          <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1.5 leading-snug">
            {r.veg_friendly_note}
          </p>
        )}
      </div>
    </Link>
  );
}
