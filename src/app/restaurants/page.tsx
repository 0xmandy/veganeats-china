"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { restaurants } from "@/lib/data";
import { RestaurantCard } from "@/components/RestaurantCard";
import { DietFilter } from "@/components/DietFilter";
import { RestaurantMapView } from "@/components/RestaurantMapView";
import type { DietTag } from "@/lib/types";

function RestaurantsContent() {
  const params = useSearchParams();
  const initView = params.get("view") === "map" ? "map" : "list";
  const initDiet = (params.get("diet") as DietTag | null) ?? "all";

  const [view, setView] = useState<"list" | "map">(initView);
  const [activeFilter, setActiveFilter] = useState<DietTag | "all">(initDiet);

  const filtered = activeFilter === "all"
    ? restaurants
    : restaurants.filter((r) => {
        if (activeFilter === "vegan" || activeFilter === "vegetarian") {
          return r.diet_tags.includes(activeFilter) || r.diet_tags.includes("veg_options");
        }
        return r.diet_tags.includes(activeFilter);
      });

  const sorted = [...filtered].sort(
    (a, b) => (a.distance_from_venue_m ?? 9999) - (b.distance_from_venue_m ?? 9999)
  );

  return (
    <div style={{ background: "#F7F5F0", minHeight: "100%" }}>
      {/* Sticky header */}
      <div className="sticky top-14 z-40 bg-[#F7F5F0] border-b border-gray-100">
        {/* View toggle + title */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div>
            <p className="text-xs text-gray-400">
              {sorted.length} {sorted.length === 1 ? "place" : "places"}
            </p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView("list")}
              className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
              style={view === "list"
                ? { background: "#fff", color: "#2D6A4F", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                : { color: "#999" }}
            >☰ List</button>
            <button
              onClick={() => setView("map")}
              className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
              style={view === "map"
                ? { background: "#fff", color: "#2D6A4F", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                : { color: "#999" }}
            >🗺 Map</button>
          </div>
        </div>

        {/* Diet filter */}
        <DietFilter active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Map view */}
      {view === "map" && (
        <RestaurantMapView restaurants={sorted} activeFilter={activeFilter} />
      )}

      {/* List view */}
      {view === "list" && (
        <div className="px-4 pt-4 pb-8">
          {sorted.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">
              No restaurants match this filter.
            </p>
          ) : (
            sorted.map((r) => <RestaurantCard key={r._id} r={r} />)
          )}
          <p className="text-center text-xs text-gray-300 mt-4">
            Data last verified: May 21, 2026
          </p>
        </div>
      )}
    </div>
  );
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div className="px-4 pt-8 text-center text-gray-400">Loading...</div>}>
      <RestaurantsContent />
    </Suspense>
  );
}
