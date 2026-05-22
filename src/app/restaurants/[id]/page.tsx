"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getRestaurantBySlug, getMenuByRestaurantId, getReviewsByRestaurantId } from "@/lib/data";
import { DIET_CONFIG, TYPE_CONFIG } from "@/lib/types";
import { MapEmbed } from "@/components/MapEmbed";

function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const text = `${name} — vegan & dietary-friendly restaurant near muShanghai 2026`;

    if (navigator.share) {
      await navigator.share({ title: name, text, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
      style={{ background: copied ? "#D4EDDA" : "#F0F0F0", color: copied ? "#155724" : "#555" }}
    >
      {copied ? "✓ Link copied" : "⎙ Share"}
    </button>
  );
}

function HoursDisplay({ hours }: { hours: import("@/lib/types").Hours }) {
  if (hours.daily) {
    return (
      <div>
        <p className="font-medium text-sm text-gray-700">{hours.daily}</p>
        {hours.note && <p className="text-xs text-gray-400 mt-0.5">{hours.note}</p>}
      </div>
    );
  }
  if (hours.mon_fri || hours.sat_sun) {
    return (
      <div className="space-y-0.5">
        {hours.mon_fri && <p className="text-sm text-gray-700"><span className="text-gray-400 text-xs">Mon–Fri </span>{hours.mon_fri}</p>}
        {hours.sat_sun && <p className="text-sm text-gray-700"><span className="text-gray-400 text-xs">Sat–Sun </span>{hours.sat_sun}</p>}
        {hours.note && <p className="text-xs text-gray-400">{hours.note}</p>}
      </div>
    );
  }
  if (hours.note) return <p className="text-sm text-gray-400">{hours.note}</p>;
  return <p className="text-sm text-gray-400">Hours not available</p>;
}

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const r = getRestaurantBySlug(id);
  if (!r) return (
    <div className="px-4 pt-8 text-center">
      <p className="text-gray-400 mb-4">Restaurant not found.</p>
      <Link href="/restaurants" className="text-sm underline" style={{ color: "#2D6A4F" }}>← Back to list</Link>
    </div>
  );

  const typeInfo = TYPE_CONFIG[r.restaurant_type];
  const hasMenuCard = ["dedicated_veg", "temple", "veg_friendly"].includes(r.restaurant_type);
  const dishes = getMenuByRestaurantId(r._id);
  const restaurantReviews = getReviewsByRestaurantId(r._id)
    .sort((a, b) => (b.approx_date ?? "").localeCompare(a.approx_date ?? ""));
  const photos = r.photos ?? [];

  return (
    <div className="pb-28" style={{ background: "#F7F5F0" }}>
      {/* Hero photo */}
      {photos.length > 0 && (
        <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
          <img
            src={photos[0]}
            alt={r.name_en}
            className="w-full h-full object-cover"
          />
          {/* Back button overlay */}
          <div className="absolute top-0 left-0 right-0 pt-4 px-4">
            <Link href="/restaurants"
              className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(4px)" }}>
              ← Restaurants
            </Link>
          </div>
          {/* Photo count badge */}
          {photos.length > 1 && (
            <span className="absolute bottom-2 right-3 text-xs text-white px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.45)" }}>
              1 / {photos.length}
            </span>
          )}
        </div>
      )}

      {/* Back (no photo fallback) */}
      {photos.length === 0 && (
        <div className="px-4 pt-4">
          <Link href="/restaurants" className="text-sm text-gray-400 flex items-center gap-1">
            ← Restaurants
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{r.name_en}</h1>
            <p className="text-gray-400 text-base mt-0.5">{r.name_zh}</p>
          </div>
          <div className="mt-1 shrink-0">
            <ShareButton name={r.name_en} />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
            {typeInfo.icon} {typeInfo.label}
          </span>
          {r.diet_tags.map((tag) => {
            const cfg = DIET_CONFIG[tag as keyof typeof DIET_CONFIG];
            if (!cfg) return null;
            return (
              <span key={tag} className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Embedded map + navigation */}
      <MapEmbed
        lat={r.lat}
        lng={r.lng}
        nameEn={r.name_en}
        nameZh={r.name_zh}
        distanceM={r.distance_from_venue_m ?? 0}
      />

      {/* Info */}
      <div className="mx-4 bg-white rounded-xl p-4 mb-4 space-y-4">
        {/* Address */}
        <div className="flex gap-3">
          <span className="text-lg mt-0.5">📍</span>
          <div>
            <p className="text-sm font-medium text-gray-800">{r.address_en}</p>
            <p className="text-sm text-gray-400 mt-0.5">{r.address_zh}</p>
          </div>
        </div>

        {/* Distance */}
        {r.distance_from_venue_m && (
          <div className="flex gap-3">
            <span className="text-lg">🚶</span>
            <p className="text-sm text-gray-600 self-center">
              {r.walk_minutes
                ? `${r.walk_minutes} min walk from Alibaba Hongqiao Center`
                : `${(r.distance_from_venue_m / 1000).toFixed(1)} km from Alibaba Hongqiao Center`}
            </p>
          </div>
        )}

        {/* Hours */}
        <div className="flex gap-3">
          <span className="text-lg">🕐</span>
          <HoursDisplay hours={r.hours} />
        </div>

        {/* Phone */}
        {r.tel && (
          <div className="flex gap-3">
            <span className="text-lg">📞</span>
            <a href={`tel:${r.tel}`} className="text-sm text-blue-500 self-center">
              {r.tel}
            </a>
          </div>
        )}

        {/* Price */}
        {r.price_level && (
          <div className="flex gap-3">
            <span className="text-lg">💰</span>
            <p className="text-sm text-gray-600 self-center">
              {"¥".repeat(r.price_level)}
              {r.avg_price_rmb ? ` · ~¥${r.avg_price_rmb}/person` : ""}
            </p>
          </div>
        )}

        {/* Veg friendly note */}
        {r.veg_friendly_note && (
          <div className="rounded-lg px-3 py-2 text-xs leading-relaxed"
            style={{ background: "#FFF8E1", color: "#5D4037", borderLeft: "3px solid #FF8F00" }}>
            {r.veg_friendly_note}
          </div>
        )}
      </div>

      {/* Real reviews from 小红书 */}
      {restaurantReviews.length > 0 && (
        <div className="mx-4 bg-white rounded-xl overflow-hidden mb-4">
          <div className="px-4 pt-4 pb-2 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">
              Real Reviews
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                ({restaurantReviews.length})
              </span>
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#FFF0F3", color: "#E11D48" }}>
              小红书
            </span>
          </div>
          <ul>
            {restaurantReviews.map((review, i) => {
              const typeIcon = review.reviewer_type === "vegan" ? "🌱"
                : review.reviewer_type === "vegetarian" ? "🥗"
                : review.reviewer_type === "halal" ? "🕌" : "👤";
              return (
                <li key={review.id}
                  className={`px-4 py-3 ${i < restaurantReviews.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">{typeIcon}</span>
                    <span className="text-xs font-medium text-gray-600">{review.author_masked}</span>
                    {review.approx_date && (
                      <span className="text-xs text-gray-300">· {review.approx_date}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">"{review.text_en}"</p>
                  {review.source_url && (
                    <a href={review.source_url} target="_blank" rel="noopener noreferrer"
                      className="inline-block mt-1.5 text-xs"
                      style={{ color: "#E11D48" }}>
                      View on 小红书 →
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Menu Highlights */}
      {dishes.length > 0 && (
        <div className="mx-4 bg-white rounded-xl overflow-hidden mb-4">
          <div className="px-4 pt-4 pb-2 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">Menu Highlights</h2>
          </div>
          <ul>
            {dishes.map((dish, i) => (
              <li key={dish._id}
                className={`px-4 py-3 flex items-start justify-between gap-3 ${i < dishes.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{dish.name_en}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{dish.name_zh}</p>
                  {dish.description_en && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{dish.description_en}</p>
                  )}
                  {dish.allergen_contains.length > 0 && (
                    <p className="text-xs mt-1" style={{ color: "#B45309" }}>
                      Contains: {dish.allergen_contains.join(", ")}
                    </p>
                  )}
                </div>
                {dish.price_rmb != null && dish.price_rmb > 0 && (
                  <span className="text-sm font-medium text-gray-500 shrink-0">¥{dish.price_rmb}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verified badge */}
      <p className="text-center text-xs text-gray-300 mb-4">
        {r.verified
          ? `✓ Info verified ${r.verified_date}`
          : "⏳ Info pending verification · "}
        <a href="mailto:feedback@veganeats.cn?subject=VeganEats Feedback" className="underline">
          Report an issue
        </a>
      </p>

      {/* CTA — fixed bottom */}
      {hasMenuCard && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3"
          style={{
            maxWidth: 480, margin: "0 auto",
            background: "linear-gradient(to top, #F7F5F0 70%, transparent)",
          }}>
          <Link href={`/restaurants/${r.slug}/menu-card`}
            className="flex items-center justify-center h-13 rounded-xl text-white font-semibold text-base active:scale-95 transition-transform"
            style={{ background: "#2D6A4F", height: 52 }}>
            View Ordering Card 点餐卡 →
          </Link>
        </div>
      )}
    </div>
  );
}
