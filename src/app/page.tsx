"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TYPE_CONFIG, DIET_CONFIG, type DietTag } from "@/lib/types";

const SUGGESTIONS = ["soup noodle", "tofu", "mushroom hot pot", "vegan dim sum", "halal noodles"];

const QUICK_FILTERS: { key: DietTag | "all"; label: string; icon: string }[] = [
  { key: "vegan",       label: "Vegan",       icon: "🌱" },
  { key: "vegetarian",  label: "Vegetarian",  icon: "🥗" },
  { key: "halal",       label: "Halal",       icon: "🕌" },
  { key: "veg_options", label: "Veg Options", icon: "🥢" },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(q: string) {
    const term = q.trim();
    if (!term) return;
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div className="flex flex-col min-h-[calc(100svh-56px)] px-4" style={{ background: "#F7F5F0" }}>
      {/* Hero */}
      <div className="flex flex-col justify-center flex-1 py-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-1">
          Nourish Well<br />in Shanghai
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Wholesome food for every diet · near muShanghai
        </p>

        {/* Search bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(query); }}
          className="relative mb-3"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "soup noodle" or "vegan tofu"'
            className="w-full h-14 pl-11 pr-4 rounded-2xl text-base bg-white shadow-sm border border-gray-100 focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-100"
            style={{ fontSize: 15 }}
          />
          {query && (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 px-4 rounded-xl text-white text-sm font-semibold"
              style={{ background: "#2D6A4F" }}
            >
              Go
            </button>
          )}
        </form>

        {/* Suggestion chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-6">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="flex-none text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-2 mb-5">
          <Link href="/restaurants?view=map"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 font-semibold text-sm"
            style={{ borderColor: "#2D6A4F", color: "#2D6A4F", background: "#fff" }}>
            🗺 Map View
          </Link>
          <Link href="/restaurants"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-white font-semibold text-sm"
            style={{ background: "#2D6A4F" }}>
            ☰ List View
          </Link>
        </div>

        {/* Quick filters */}
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Browse by diet</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {QUICK_FILTERS.map(({ key, label, icon }) => (
            <Link
              key={key}
              href={`/restaurants?diet=${key}`}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm text-sm font-medium text-gray-700 active:scale-95 transition-transform"
            >
              <span className="text-lg">{icon}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Event badge */}
        <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#EAF4EE", color: "#2D6A4F" }}>
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span><strong>May 10 – Jun 6, 2026</strong> · Alibaba Hongqiao Center</span>
          </div>
        </div>
      </div>

      <footer className="py-5 text-center text-xs text-gray-300">
        © 2026 VeganEats China · Made for muShanghai
      </footer>
    </div>
  );
}
