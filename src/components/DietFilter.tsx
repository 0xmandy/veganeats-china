"use client";
import { DIET_CONFIG, type DietTag } from "@/lib/types";

const FILTERS: { key: DietTag | "all"; label: string }[] = [
  { key: "all",        label: "All" },
  { key: "vegan",      label: "Vegan" },
  { key: "vegetarian", label: "Vegetarian" },
  { key: "halal",      label: "Halal" },
  { key: "veg_options",label: "Veg Options" },
];

export function DietFilter({
  active,
  onChange,
}: {
  active: DietTag | "all";
  onChange: (v: DietTag | "all") => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-3 -mx-4">
      {FILTERS.map(({ key, label }) => {
        const isActive = active === key;
        const cfg = key !== "all" ? DIET_CONFIG[key as DietTag] : null;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex-none h-8 px-3 rounded-full text-sm font-medium transition-all active:scale-95 whitespace-nowrap"
            style={
              isActive
                ? { background: "#F59E0B", color: "#fff" }
                : { background: "#F0F0F0", color: "#555" }
            }
          >
            {cfg?.icon ? `${cfg.icon} ` : ""}{label}
          </button>
        );
      })}
    </div>
  );
}
