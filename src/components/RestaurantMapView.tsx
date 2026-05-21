"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import type { Restaurant, DietTag } from "@/lib/types";
import { TYPE_CONFIG, DIET_CONFIG } from "@/lib/types";

const VENUE = { lng: 121.313753, lat: 31.205357 };
const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_JS_KEY!;

// Pin color per type
const PIN_COLOR: Record<string, string> = {
  dedicated_veg: "#2D6A4F",
  veg_friendly:  "#F59E0B",
  halal:         "#92400E",
  temple:        "#6D28D9",
};

interface Props {
  restaurants: Restaurant[];
  activeFilter: DietTag | "all";
}

export function RestaurantMapView({ restaurants, activeFilter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  function pinContent(r: Restaurant) {
    const color = PIN_COLOR[r.restaurant_type] ?? "#2D6A4F";
    const icon = TYPE_CONFIG[r.restaurant_type]?.icon ?? "🍽";
    return `<div style="
      background:${color};color:#fff;
      width:32px;height:32px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:14px;
    "><span style="transform:rotate(45deg)">${icon}</span></div>`;
  }

  function clearMarkers() {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }

  function placeMarkers(map: any, list: Restaurant[]) {
    const AMap = (window as any).AMap;
    if (!AMap) return;
    clearMarkers();
    list.forEach((r) => {
      const marker = new AMap.Marker({
        map,
        position: [r.lng, r.lat],
        zIndex: 100,
        content: pinContent(r),
        offset: new AMap.Pixel(-16, -32),
      });
      marker.on("click", () => setSelected(r));
      markersRef.current.push(marker);
    });
    map.setFitView();
  }

  function initMap() {
    const AMap = (window as any).AMap;
    if (!AMap || !containerRef.current || mapRef.current) return;

    const map = new AMap.Map(containerRef.current, {
      zoom: 13,
      center: [VENUE.lng, VENUE.lat],
      lang: "en",
      mapStyle: "amap://styles/whitesmoke",
    });
    mapRef.current = map;

    // Venue pin
    new AMap.Marker({
      map,
      position: [VENUE.lng, VENUE.lat],
      zIndex: 200,
      label: {
        content: '<div style="background:#1e40af;color:#fff;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;white-space:nowrap">📍 muShanghai</div>',
        direction: "top",
        offset: new AMap.Pixel(-40, -6),
      },
    });

    placeMarkers(map, restaurants);
  }

  // Init map once script is ready
  useEffect(() => {
    if (scriptReady && !mapRef.current) initMap();
  }, [scriptReady]);

  // Update pins whenever filtered list changes
  useEffect(() => {
    if (!mapRef.current) return;
    setSelected(null);
    placeMarkers(mapRef.current, restaurants);
  }, [restaurants]);

  useEffect(() => {
    return () => { clearMarkers(); mapRef.current?.destroy(); mapRef.current = null; };
  }, []);

  return (
    <div className="relative" style={{ height: "calc(100svh - 56px)" }}>
      <Script
        src={`https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&lang=en`}
        strategy="afterInteractive"
        onLoad={() => { setScriptReady(true); initMap(); }}
      />

      {/* Map */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute top-3 right-3 bg-white rounded-xl shadow-md p-2.5 flex flex-col gap-1.5 text-xs">
        {Object.entries(PIN_COLOR).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full flex-none" style={{ background: color }} />
            <span className="text-gray-500">{TYPE_CONFIG[type as keyof typeof TYPE_CONFIG]?.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom sheet — selected restaurant */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 animate-slide-up">
          {/* Dismiss */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-4 text-gray-300 text-xl"
          >×</button>

          <div className="flex gap-3">
            {/* Thumbnail */}
            {selected.photos?.[0] ? (
              <img src={selected.photos[0]} alt={selected.name_en}
                className="w-20 h-20 rounded-xl object-cover flex-none"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            ) : (
              <div className="w-20 h-20 rounded-xl flex-none flex items-center justify-center text-3xl"
                style={{ background: "#F0F9F4" }}>
                {TYPE_CONFIG[selected.restaurant_type]?.icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 leading-tight">{selected.name_en}</p>
              <p className="text-gray-400 text-xs mt-0.5">{selected.name_zh}</p>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                {selected.distance_from_venue_m && (
                  <span>📍 {(selected.distance_from_venue_m / 1000).toFixed(1)}km</span>
                )}
                {selected.rating && <span>⭐ {selected.rating}</span>}
                {selected.hours.daily && <span>🕐 {selected.hours.daily}</span>}
              </div>
              {/* Diet tags */}
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {selected.diet_tags.map((tag) => {
                  const cfg = DIET_CONFIG[tag as keyof typeof DIET_CONFIG];
                  if (!cfg) return null;
                  return (
                    <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Link href={`/restaurants/${selected.slug}`}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#2D6A4F" }}>
              View Details
            </Link>
            <Link href={`/restaurants/${selected.slug}/menu-card`}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold"
              style={{ border: "1.5px solid #2D6A4F", color: "#2D6A4F" }}>
              Ordering Card
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
