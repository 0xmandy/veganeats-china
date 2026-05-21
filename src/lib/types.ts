export type RestaurantType = "dedicated_veg" | "veg_friendly" | "halal" | "temple";
export type DietTag = "vegan" | "vegetarian" | "halal" | "veg_options";
export type Confidence = "confirmed" | "likely" | "partial";

export interface Hours {
  daily?: string;
  mon_fri?: string;
  sat_sun?: string;
  mon?: string; tue?: string; wed?: string;
  thu?: string; fri?: string; sat?: string; sun?: string;
  note?: string;
}

export interface Restaurant {
  _id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  restaurant_type: RestaurantType;
  diet_tags: DietTag[];
  address_zh: string;
  address_en: string;
  lat: number;
  lng: number;
  distance_from_venue_m?: number;
  walk_minutes?: number;
  tel?: string;
  price_level?: 1 | 2 | 3;
  avg_price_rmb?: number;
  hours: Hours;
  veg_friendly_note?: string;
  special_type?: string;
  photos?: string[];
  rating?: string;
  amap_id?: string;
  verified: boolean;
  verified_date?: string;
  notes?: string;
  active?: boolean;
}

export interface MenuItem {
  _id: string;
  restaurant_id: string;
  name_en: string;
  name_zh: string;
  description_en?: string;
  price_rmb?: number;
  diet_tags: string[];
  allergen_free: string[];
  allergen_contains: string[];
  display_order?: number;
}

export const DIET_CONFIG: Record<DietTag, {
  label: string; color: string; bg: string; icon: string;
}> = {
  vegan:       { label: "Vegan",       color: "#155724", bg: "#D4EDDA", icon: "🌱" },
  vegetarian:  { label: "Vegetarian",  color: "#004085", bg: "#CCE5FF", icon: "🥗" },
  halal:       { label: "Halal",       color: "#5D4037", bg: "#FFF8E1", icon: "🕌" },
  veg_options: { label: "Veg Options", color: "#6D4C41", bg: "#EFEBE9", icon: "🥢" },
};

export const TYPE_CONFIG: Record<RestaurantType, { label: string; icon: string }> = {
  dedicated_veg: { label: "Fully Vegetarian", icon: "🌿" },
  veg_friendly:  { label: "Veg Options",      icon: "🥗" },
  halal:         { label: "Halal",            icon: "🕌" },
  temple:        { label: "Temple Dining",    icon: "🏯" },
};
