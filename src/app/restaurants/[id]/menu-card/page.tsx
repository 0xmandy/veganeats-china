"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getRestaurantBySlug, ORDERING_PHRASES } from "@/lib/data";
import type { DietTag } from "@/lib/types";

export default function MenuCardPage() {
  const { id } = useParams<{ id: string }>();
  const r = getRestaurantBySlug(id);
  if (!r) return (
    <div className="px-4 pt-8 text-center">
      <p className="text-gray-400 mb-4">Restaurant not found.</p>
      <Link href="/restaurants" className="text-sm underline" style={{ color: "#2D6A4F" }}>← Back to list</Link>
    </div>
  );

  // Pick phrases based on restaurant type
  const phraseKey: DietTag =
    r.diet_tags.includes("halal") ? "halal"
    : r.diet_tags.includes("vegan") ? "vegan"
    : "vegetarian";

  const phrases = ORDERING_PHRASES[phraseKey];

  return (
    <div className="px-4 pb-10" style={{ background: "#F7F5F0", minHeight: "100%" }}>
      {/* Back */}
      <div className="pt-4 mb-3">
        <Link href={`/restaurants/${r.slug}`} className="text-sm text-gray-400 flex items-center gap-1">
          ← {r.name_en}
        </Link>
      </div>

      {/* Page title */}
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Ordering Card</p>
      <h1 className="text-xl font-bold text-gray-900 mb-1">{r.name_zh}</h1>
      <p className="text-sm text-gray-400 mb-4">Show this card to your server</p>

      {/* Identity card — large Chinese text for server */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm"
        style={{ borderLeft: "4px solid #2D6A4F" }}>
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Show to server · 请出示给服务员</p>
        <p className="text-xl font-bold leading-relaxed" style={{ color: "#2D6A4F", fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif" }}>
          {phraseKey === "halal"
            ? "我是穆斯林，只能吃清真食品。"
            : phraseKey === "vegan"
            ? "您好！我是纯素食者，不吃任何动物产品。"
            : "您好！我是素食者，不吃肉类和海鲜。"}
        </p>
      </div>

      {/* Phrase cards */}
      <div className="space-y-3">
        {phrases.map((p, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-base font-semibold leading-snug mb-2"
              style={{ fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif", fontSize: 18 }}>
              {p.zh}
            </p>
            <p className="text-sm text-gray-500 leading-snug">{p.en}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-300 mt-6">
        Phrases may vary by restaurant · Last verified: May 21, 2026
      </p>
    </div>
  );
}
