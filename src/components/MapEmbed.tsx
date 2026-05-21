"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const VENUE_LNG = 121.313753;
const VENUE_LAT = 31.205357;
const AMAP_KEY = process.env.NEXT_PUBLIC_AMAP_JS_KEY!;

interface Props {
  lng: number;
  lat: number;
  nameEn: string;
  nameZh: string;
  distanceM: number;
}

export function MapEmbed({ lng, lat, nameEn, nameZh, distanceM }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const walkingRef = useRef<any>(null);
  const [mode, setMode] = useState<"walk" | "didi">("walk");
  const [walkMin, setWalkMin] = useState<number | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // suggest didi for >1.5km
  const suggestDidi = distanceM > 1500;

  function initMap() {
    const AMap = (window as any).AMap;
    if (!AMap || !containerRef.current || mapRef.current) return;

    const map = new AMap.Map(containerRef.current, {
      zoom: 15,
      center: [lng, lat],
      lang: "en",
      mapStyle: "amap://styles/whitesmoke",
    });
    mapRef.current = map;

    // Venue marker (start)
    new AMap.Marker({
      map,
      position: [VENUE_LNG, VENUE_LAT],
      label: {
        content: '<div style="background:#2D6A4F;color:#fff;padding:2px 6px;border-radius:4px;font-size:11px;white-space:nowrap">muShanghai</div>',
        offset: new AMap.Pixel(-30, -8),
        direction: "top",
      },
    });

    // Restaurant marker (end)
    new AMap.Marker({
      map,
      position: [lng, lat],
      label: {
        content: `<div style="background:#1677FF;color:#fff;padding:2px 6px;border-radius:4px;font-size:11px;white-space:nowrap">${nameEn}</div>`,
        offset: new AMap.Pixel(-30, -8),
        direction: "top",
      },
    });

    // Draw walking route
    AMap.plugin("AMap.Walking", () => {
      const walking = new (window as any).AMap.Walking({ map, hideMarkers: true });
      walkingRef.current = walking;
      walking.search(
        [VENUE_LNG, VENUE_LAT],
        [lng, lat],
        (status: string, result: any) => {
          if (status === "complete") {
            const secs = result.routes?.[0]?.time;
            if (secs) setWalkMin(Math.ceil(secs / 60));
            // Fit map to show full route
            map.setFitView();
          }
        }
      );
    });
  }

  // Re-init if script already loaded on a previous navigation
  useEffect(() => {
    if (scriptReady && !mapRef.current) initMap();
  }, [scriptReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="mx-4 mb-4">
      <Script
        src={`https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&lang=en`}
        strategy="afterInteractive"
        onLoad={() => { setScriptReady(true); initMap(); }}
      />

      {/* Map container */}
      <div
        ref={containerRef}
        className="rounded-xl overflow-hidden bg-gray-100"
        style={{ height: 220 }}
      />

      {/* Mode toggle + actions */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setMode("walk")}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          style={mode === "walk"
            ? { background: "#2D6A4F", color: "#fff" }
            : { background: "#F0F0F0", color: "#555" }}
        >
          🚶 Walk{walkMin ? ` · ${walkMin} min` : ""}
        </button>

        <button
          onClick={() => setMode("didi")}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors relative"
          style={mode === "didi"
            ? { background: "#FF6B00", color: "#fff" }
            : { background: "#F0F0F0", color: "#555" }}
        >
          🚗 DiDi
          {suggestDidi && mode !== "didi" && (
            <span className="absolute -top-1.5 -right-1 text-xs bg-red-500 text-white px-1 rounded-full">
              Rec
            </span>
          )}
        </button>
      </div>

      {/* DiDi mock panel */}
      {mode === "didi" && (
        <div className="mt-2 rounded-xl p-4 text-sm text-center"
          style={{ background: "#FFF3E0", border: "1px solid #FFE0B2" }}>
          <p className="font-semibold text-orange-700 mb-1">DiDi Ride-hailing</p>
          <p className="text-orange-600 text-xs mb-3">
            Show the address below to your driver, or copy into DiDi app.
          </p>
          <div className="bg-white rounded-lg p-2 mb-3 text-gray-800 font-medium text-base leading-snug"
            style={{ fontFamily: "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif" }}>
            {nameZh}
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(nameZh).catch(() => {});
              window.open(`diditaxi://`, "_blank");
            }}
            className="w-full py-2.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: "#FF6B00" }}
          >
            Open DiDi App →
          </button>
          <p className="text-xs text-orange-400 mt-2">
            Full in-app booking coming soon
          </p>
        </div>
      )}
    </div>
  );
}
