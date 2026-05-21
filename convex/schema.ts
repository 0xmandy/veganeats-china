import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * VeganEats China — Convex Database Schema
 *
 * 设计原则：
 * 1. 多城市扩展：restaurants 通过 city_id 关联 cities 表
 * 2. 多饮食类型：diet_profiles 表独立管理，通过 junction 表关联餐厅
 * 3. 多过敏原：allergens 表独立，flag 区分"含有/不含/可能含"
 * 4. 避免 schema 爆炸：所有分类通过引用表扩展，不在主表加字段
 * 5. 菜品与餐厅解耦：menu_items 独立存储，支持未来用户贡献
 */

export default defineSchema({

  // ── 城市表（多城市扩展基础） ──────────────────────────────────────────────
  cities: defineTable({
    slug: v.string(),         // "shanghai" | "beijing" | "chengdu"
    name_en: v.string(),
    name_zh: v.string(),
    country: v.string(),      // "CN"
    active: v.boolean(),
  }).index("by_slug", ["slug"]),

  // ── 饮食类型表（可无限扩展新类型） ────────────────────────────────────────
  // 当前：vegan / vegetarian / halal / veg_friendly
  // 未来：jain / kosher / raw_vegan / macrobiotic / ...
  diet_profiles: defineTable({
    slug: v.string(),         // "vegan" | "vegetarian" | "halal" | "veg_friendly"
    name_en: v.string(),
    name_zh: v.string(),
    description_en: v.string(),
    icon: v.string(),         // emoji 或 icon name
    color_hex: v.string(),    // UI tag 颜色
    sort_order: v.number(),   // 显示顺序
    active: v.boolean(),
  }).index("by_slug", ["slug"]),

  // ── 过敏原 / 成分表 ────────────────────────────────────────────────────────
  // 同时承载三类信息：食物过敏原、宗教禁忌成分、普通隐藏成分
  // category 区分用途，避免混在一起
  allergens: defineTable({
    slug: v.string(),         // "gluten" | "nuts" | "pork" | "alcohol" | "oyster_sauce"
    name_en: v.string(),
    name_zh: v.string(),
    name_zh_pinyin: v.string(),
    category: v.union(
      v.literal("allergen"),      // 医学过敏原（花生/海鲜/麸质/坚果/乳制品/蛋/大豆）
      v.literal("religious"),     // 宗教禁忌（猪肉/酒精/动物血）
      v.literal("hidden_ingredient"), // 中餐隐藏成分（蚝油/猪油/鸡精/骨汤）
      v.literal("diet_blocker")   // 饮食限制成分（肉类/海鲜/蛋/奶）
    ),
    severity: v.optional(v.union(
      v.literal("critical"),      // 危及生命（严重过敏）
      v.literal("religious"),     // 宗教/道德禁忌
      v.literal("preference"),    // 饮食偏好
    )),
    icon: v.optional(v.string()),
    active: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  // ── 餐厅主表 ──────────────────────────────────────────────────────────────
  restaurants: defineTable({
    city_id: v.id("cities"),
    slug: v.string(),         // URL slug，如 "hongqiao-sufang"
    name_en: v.string(),
    name_zh: v.string(),
    restaurant_type: v.union(
      v.literal("dedicated_veg"),   // 全素食餐厅
      v.literal("veg_friendly"),    // 有素食套餐的普通餐厅
      v.literal("halal"),           // 清真餐厅
      v.literal("temple"),          // 寺庙素斋
    ),
    address_zh: v.string(),
    address_en: v.string(),
    lat: v.number(),
    lng: v.number(),
    distance_from_venue_m: v.optional(v.number()),
    tel: v.optional(v.string()),
    price_level: v.optional(v.number()),      // 1=¥ 2=¥¥ 3=¥¥¥
    avg_price_rmb: v.optional(v.number()),
    hours: v.object({
      // 支持两种格式：统一时间 或 分天设置
      daily: v.optional(v.string()),          // "11:00-21:00"
      mon_fri: v.optional(v.string()),
      sat_sun: v.optional(v.string()),
      mon: v.optional(v.string()),
      tue: v.optional(v.string()),
      wed: v.optional(v.string()),
      thu: v.optional(v.string()),
      fri: v.optional(v.string()),
      sat: v.optional(v.string()),
      sun: v.optional(v.string()),
      note: v.optional(v.string()),           // 特殊说明，如"节假日可能关闭"
    }),
    veg_friendly_note: v.optional(v.string()), // 仅 veg_friendly 类型填写
    special_type: v.optional(v.string()),      // "temple" | "noodles" 等细分标签
    active: v.boolean(),
    verified: v.boolean(),
    verified_date: v.optional(v.string()),
    notes: v.optional(v.string()),            // 内部运营备注
  })
    .index("by_city", ["city_id"])
    .index("by_slug", ["slug"])
    .index("by_type", ["restaurant_type"])
    .index("by_city_type", ["city_id", "restaurant_type"]),

  // ── 餐厅 ↔ 饮食类型 关联表 ─────────────────────────────────────────────────
  // 多对多：一家餐厅可同时标注 vegan + vegetarian + halal
  // 新增饮食类型只需在 diet_profiles 加一行，无需改 restaurants 表
  restaurant_diet_tags: defineTable({
    restaurant_id: v.id("restaurants"),
    diet_profile_id: v.id("diet_profiles"),
    confidence: v.union(
      v.literal("confirmed"),   // 已人工核实
      v.literal("likely"),      // 高置信度推断（如新疆菜馆=清真）
      v.literal("partial"),     // 部分菜品符合，非全部
    ),
  })
    .index("by_restaurant", ["restaurant_id"])
    .index("by_diet_profile", ["diet_profile_id"]),

  // ── 餐厅 ↔ 过敏原 标记表 ───────────────────────────────────────────────────
  // 标记某餐厅"含/不含/可能含"某种成分
  // 未来：用户在有过敏需求时，可直接筛选"不含花生"的餐厅
  restaurant_allergen_flags: defineTable({
    restaurant_id: v.id("restaurants"),
    allergen_id: v.id("allergens"),
    flag_type: v.union(
      v.literal("contains"),        // 确认含有
      v.literal("free_from"),       // 确认不含
      v.literal("may_contain"),     // 可能含有（交叉污染风险）
    ),
    note: v.optional(v.string()),
  })
    .index("by_restaurant", ["restaurant_id"])
    .index("by_allergen", ["allergen_id"]),

  // ── 菜品表 ────────────────────────────────────────────────────────────────
  menu_items: defineTable({
    restaurant_id: v.id("restaurants"),
    name_en: v.string(),
    name_zh: v.string(),
    description_en: v.optional(v.string()),
    price_rmb: v.optional(v.number()),
    // 冗余存储 slug 数组，避免 join 查询（Convex 无原生 JOIN）
    diet_tags: v.array(v.string()),         // ["vegan", "vegetarian"]
    allergen_free: v.array(v.string()),     // ["gluten", "nuts"]
    allergen_contains: v.array(v.string()), // ["egg", "dairy"]
    display_order: v.optional(v.number()),
    active: v.boolean(),
    verified_date: v.optional(v.string()),
  })
    .index("by_restaurant", ["restaurant_id"]),

  // ── 点餐卡短句（全局，按饮食类型分组） ──────────────────────────────────────
  // 解耦于具体餐厅，可跨餐厅复用
  // 未来可按城市/菜系定制不同版本
  ordering_phrases: defineTable({
    diet_profile_id: v.id("diet_profiles"),
    phrase_zh: v.string(),
    phrase_en: v.string(),
    use_case: v.union(
      v.literal("identity"),        // "我是素食者"
      v.literal("sauce_warning"),   // "不要加蚝油/鱼露"
      v.literal("oil_warning"),     // "不要用猪油"
      v.literal("broth_warning"),   // "不要用骨汤"
      v.literal("confirm_dish"),    // "这道菜里有没有…"
      v.literal("ask_recommend"),   // "有什么适合我的推荐？"
      v.literal("allergy_card"),    // 专用过敏声明卡
    ),
    sort_order: v.number(),
    active: v.boolean(),
  }).index("by_diet_profile", ["diet_profile_id"]),

  // ── 系统元数据 ─────────────────────────────────────────────────────────────
  meta: defineTable({
    key: v.string(),    // "last_updated" | "venue_lat" | "venue_lng" | "venue_name"
    value: v.string(),
  }).index("by_key", ["key"]),
});
