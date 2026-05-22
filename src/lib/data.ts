import type { Restaurant, MenuItem, Review, DietTag } from "./types";

// 静态数据源，Convex 接入后此文件作为 seed 数据
export const VENUE = {
  name: "muShanghai · Alibaba Hongqiao Center T2",
  address: "1-4 Shenzhang Rd Lane 1398, Minhang, Shanghai",
  address_zh: "申长路1398弄1-4号（阿里中心·上海虹桥T2座）",
  lat: 31.205357,
  lng: 121.313753,
};

export const restaurants: Restaurant[] = [
  {
    _id: "hongqiao-sufang",
    slug: "hongqiao-sufang",
    name_en: "GoodBridge Vegetarian",
    name_zh: "虹桥素坊",
    restaurant_type: "dedicated_veg",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "申长路888号虹桥天地北区A座2F",
    address_en: "2F Block A North, Hongqiao Tiandi, 888 Shenzhang Rd",
    lat: 31.194468, lng: 121.315062,
    distance_from_venue_m: 1217, walk_minutes: 15,
    tel: "021-64527810",
    price_level: 3, avg_price_rmb: 141, rating: "4.3",
    amap_id: "B0M6MSU7LB",
    photos: [
      "https://store.is.autonavi.com/showpic/06b004e0019ad0138da42a00269c2b9d",
      "https://aos-comment.amap.com/B0M6MSU7LB/comment/content_media_external_file_100002383_1768048823838_88892112.jpg",
      "https://store.is.autonavi.com/showpic/5c98397b6a17ccd7874347361e58ba08",
    ],
    hours: {
      daily: "09:30–21:00",
      note: "Breakfast 9:30–11:00 · Lunch 11:05–14:00 · Afternoon tea 14:10–16:30 · Dinner 17:00–21:00",
    },
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "panlong-an",
    slug: "panlong-an",
    name_en: "Panlong Temple",
    name_zh: "蟠龙庵",
    restaurant_type: "temple",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "徐泾镇蟠龙村（蟠龙路地铁站3号口步行420米）",
    address_en: "Panlong Village, Xujing Town (420m from Panlong Rd Metro Exit 3)",
    lat: 31.187157, lng: 121.276111,
    distance_from_venue_m: 4113,
    price_level: 1, avg_price_rmb: 20,
    hours: {
      daily: "07:30–16:00",
      note: "Vegetarian noodles at lunch · ¥20/bowl. May close on Buddhist holy days.",
    },
    verified: true, verified_date: "2026-05-21",
    special_type: "temple",
  },
  {
    _id: "suxiangzhen",
    slug: "suxiangzhen",
    name_en: "Suxiangzhen Vegetarian",
    name_zh: "素香珍",
    restaurant_type: "dedicated_veg",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "申虹路1188弄1216号（恒基·旭辉中心）",
    address_en: "1216, Lane 1188 Shenhong Rd, Ecobase Cifi Center",
    lat: 31.213423, lng: 121.315961,
    distance_from_venue_m: 921,
    tel: "13818269099",
    price_level: 2, avg_price_rmb: 41, rating: "4.1",
    amap_id: "B0H3CHBKTX",
    photos: [
      "https://aos-comment.amap.com/B0H3CHBKTX/comment/E52ED856_B3EB_4D09_AB64_819D5D601DDF_L0_001_1500_2000_1728137805977_96410912.jpg",
      "https://aos-comment.amap.com/B0H3CHBKTX/comment/635692BA_4B73_4722_9F5B_0A37EFC45D5C_L0_001_1500_2000_1728137805977_33069745.jpg",
    ],
    hours: { daily: "09:30–18:00" },
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "xifa-shuyuan",
    slug: "xifa-shuyuan",
    name_en: "Xifa Vegetarian Garden",
    name_zh: "悉发蔬苑",
    restaurant_type: "dedicated_veg",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "盘阳路66弄融信绿地国际二期6幢7-7号",
    address_en: "Bldg 6 #7-7, Rongxin Greenland International Phase 2, 66 Panyang Rd",
    lat: 31.210904, lng: 121.282632,
    distance_from_venue_m: 3023,
    tel: "15759473528",
    price_level: 2, avg_price_rmb: 58, rating: "4.1",
    amap_id: "B0JACSU9JA",
    photos: ["http://store.is.autonavi.com/showpic/7fd702ad60770adbb03a04e76901f1f2"],
    hours: { daily: "10:00–20:00" },
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "daxiang-wuyu",
    slug: "daxiang-wuyu",
    name_en: "Daxiang Wuyu Vegetarian",
    name_zh: "大象无隅",
    restaurant_type: "dedicated_veg",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "鼎誉路91弄6号SZ101室（蟠龙天地附近）",
    address_en: "SZ101, Bldg 6, 91 Dingyu Rd (near Panlong Tiandi)",
    lat: 31.187507, lng: 121.276191,
    distance_from_venue_m: 4087,
    tel: "15800715212",
    price_level: 2, avg_price_rmb: 45, rating: "4.3",
    amap_id: "B0KDG9O2PD",
    photos: [
      "https://aos-comment.amap.com/B0KDG9O2PD/comment/67B62426_0745_44FC_AD42_615D4388C60C_L0_001_2000_1500_1743318918383_06762244.jpg",
      "https://aos-comment.amap.com/B0KDG9O2PD/comment/content_media_external_images_media_182638_ss__1741245003367_05990564.jpg",
      "https://aos-comment.amap.com/B0KDG9O2PD/comment/content_media_external_file_20462_ss__1763885832230_12320114.jpg",
    ],
    hours: { daily: "10:00–21:00" },
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "qibao-temple",
    slug: "qibao-temple",
    name_en: "Qibao Temple Vegetarian Hall",
    name_zh: "七宝教寺素斋部",
    restaurant_type: "temple",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "七宝镇新镇路1205号七宝教寺内（东北角）",
    address_en: "Inside Qibao Temple (NE), 1205 Xinzhen Rd, Qibao Town",
    lat: 31.154427, lng: 121.357706,
    distance_from_venue_m: 7040,
    tel: "021-64598500",
    price_level: 1, avg_price_rmb: 22, rating: "4.4",
    amap_id: "B00156RXO1",
    photos: [
      "https://aos-comment.amap.com/B00156RXO1/comment/21fabdabc98007c9d6157582314b9bc6_2048_2048_80.jpg",
      "https://aos-comment.amap.com/B00156RXO1/comment/680c3b78de1f10d47b6b070dac70cf51_2048_2048_80.jpg",
    ],
    hours: {
      daily: "07:00–19:00",
      note: "Inside Qibao Ancient Town. Buddhist vegetarian food, call ahead to confirm.",
    },
    special_type: "temple",
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "quanyouzhai",
    slug: "quanyouzhai",
    name_en: "Quanyouzhai Vegetarian Noodles",
    name_zh: "全有斋面馆",
    restaurant_type: "dedicated_veg",
    diet_tags: ["vegan", "vegetarian"],
    address_zh: "富强街28-21号",
    address_en: "28-21 Fuqiang St",
    lat: 31.154461, lng: 121.360441,
    distance_from_venue_m: 7194,
    tel: "15902158538",
    price_level: 1, avg_price_rmb: 24, rating: "3.9",
    amap_id: "B0IKNH739S",
    photos: [
      "https://aos-comment.amap.com/B0IKNH739S/comment/content_media_external_file_1000008757_ss__1763470485848_43517162.jpg",
      "https://aos-comment.amap.com/B0IKNH739S/comment/content_media_external_images_media_1000051027_ss__1728288031614_43383055.jpg",
    ],
    hours: { daily: "07:00–21:00" },
    special_type: "noodles",
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "banjiang",
    slug: "banjiang",
    name_en: "Banjiang Spicy Pot",
    name_zh: "拌将（麻辣烫）",
    restaurant_type: "veg_friendly",
    diet_tags: ["veg_options"],
    address_zh: "申长路1389弄1-4号地下一层09B",
    address_en: "B1-09B, 1-4 Shenzhang Rd Lane 1389",
    lat: 31.205159, lng: 121.313768,
    distance_from_venue_m: 22, walk_minutes: 1,
    price_level: 1,
    hours: { daily: "Open 24 hours" },
    veg_friendly_note: "Self-serve spicy pot. Pick your own vegetables for a fully vegan set — skip the meat section.",
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "zhangliang-hongqiao",
    slug: "zhangliang-hongqiao",
    name_en: "Zhang Liang Mala Tang",
    name_zh: "张亮麻辣烫（虹桥天街）",
    restaurant_type: "veg_friendly",
    diet_tags: ["veg_options"],
    address_zh: "申长路869号龙湖虹桥天街A馆B2-05",
    address_en: "B2-05 Block A, Longfor Hongqiao Paradise Walk, 869 Shenzhang Rd",
    lat: 31.191526, lng: 121.31174,
    distance_from_venue_m: 1550, walk_minutes: 19,
    tel: "18930838978",
    price_level: 1, avg_price_rmb: 30, rating: "4.1",
    amap_id: "B0G3LUIVR9",
    photos: [
      "https://img.alicdn.com/imgextra/i2/O1CN013Da1GK1Ex2GzcHFBd_!!6000000000417-49-tps-750-750.webp",
      "https://store.is.autonavi.com/showpic/a7ed2563df7a71cab47eb451ab21acfd",
    ],
    hours: { daily: "10:00–22:00" },
    veg_friendly_note: "National chain spicy pot. Choose only vegetables and tofu for a vegan meal — meat and veg sections are separate.",
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "taerlan",
    slug: "taerlan",
    name_en: "Taerlan Xinjiang Restaurant",
    name_zh: "塔尔兰（新疆菜）",
    restaurant_type: "halal",
    diet_tags: ["halal"],
    address_zh: "申滨南路1058号D栋105室",
    address_en: "D105, 1058 Shenbin South Rd",
    lat: 31.190837, lng: 121.312814,
    distance_from_venue_m: 1617, walk_minutes: 20,
    tel: "021-54313828",
    price_level: 1, avg_price_rmb: 37, rating: "4.4",
    amap_id: "B0K0ORIKXN",
    photos: [
      "https://aos-comment.amap.com/B0K0ORIKXN/comment/57CA6867_ACAE_4141_8A4F_42B5EF08BD65_L0_001_1500_200_1765345724737_92179545.jpg",
      "https://aos-comment.amap.com/B0K0ORIKXN/comment/77D7F2B8_F6D5_451D_ABD0_A93323F53990_L0_001_1080_144_1755309404717_04623637.jpg",
    ],
    hours: {
      daily: "10:30–14:30, 16:30–21:30",
      note: "Two sessions — closed between 14:30 and 16:30.",
    },
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "yunshanji",
    slug: "yunshanji",
    // name_en: UI display for foreign users
    name_en: "Yunshanji Yunnan Mushroom Hot Pot",
    // name_zh: used for Amap navigation URI and geocoding
    name_zh: "芸山季·云南山珍菌火锅",
    restaurant_type: "veg_friendly",
    diet_tags: ["veg_options"],
    // address_en: UI display
    address_en: "SE of Helongqiao Rd & Yale Rd intersection, Qianwan Impresscity MEGA",
    // address_zh: used for Amap navigation and showing to taxi drivers
    address_zh: "鹤龙桥路与雅乐路交叉口东南80米（前湾印象城MEGA）",
    lat: 31.216354,
    lng: 121.279322,
    distance_from_venue_m: 3495,
    tel: "19921670394",
    price_level: 3, avg_price_rmb: 105, rating: "4.1",
    amap_id: "B0LKOMEZHE",
    photos: [
      "https://aos-comment.amap.com/B0LKOMEZHE/comment/6EB408E6_ABA0_4CF6_8773_399CF39805CA_L0_001_2000_150_1772178940155_85888422.jpg",
      "https://store.is.autonavi.com/showpic/caf53be282caab80a19cf47e09cdb0f0",
    ],
    hours: { daily: "11:00–22:00" },
    veg_friendly_note: "Yunnan-style mushroom hot pot. Rich in wild mushrooms and vegetables — ask for a vegetarian broth base (素汤底) and skip meat skewers.",
    verified: true,
    verified_date: "2026-05-21",
    active: true,
  },
  {
    _id: "majiyu-qingzhen",
    slug: "majiyu-qingzhen",
    name_en: "Ma Ji Yun Halal Noodles",
    name_zh: "清真·馬記云西北牛肉面",
    restaurant_type: "halal",
    diet_tags: ["halal"],
    address_zh: "申缤南路1156号102室",
    address_en: "102, 1156 Shenbin South Rd",
    lat: 31.192458, lng: 121.311898,
    distance_from_venue_m: 1445, walk_minutes: 18,
    tel: "18219805424",
    price_level: 1, avg_price_rmb: 22, rating: "4.3",
    amap_id: "B0KGRHI0ME",
    photos: [
      "http://store.is.autonavi.com/showpic/2d915c44580f1eb22d1b24300aee73ec",
      "https://aos-comment.amap.com/B0KGRHI0ME/comment/content_media_external_images_media_1000040083_ss__1736436487580_69204028.jpg",
    ],
    hours: {
      mon_fri: "09:00–20:00",
      sat_sun: "10:00–20:00",
    },
    verified: true, verified_date: "2026-05-21",
  },
  {
    _id: "greenfriday-huiju",
    slug: "greenfriday-huiju",
    name_en: "GreenFriday Vegan Restaurant",
    name_zh: "GreenFriday天素花园餐厅（荟聚店）",
    restaurant_type: "dedicated_veg",
    diet_tags: ["vegan", "vegetarian"],
    address_en: "L4B03, Livat Shopping Centre, 788 Jinzhong Rd",
    address_zh: "金钟路788号荟聚购物中心L4B03",
    lat: 31.221909, lng: 121.356695,
    distance_from_venue_m: 4479,
    tel: "18217597190",
    price_level: 2, avg_price_rmb: 96, rating: "4.3",
    amap_id: "B0L1ZUNFUG",
    photos: [
      "https://store.is.autonavi.com/showpic/73b9cb9e2531528fc71b5b3366c42c6c",
      "https://aos-comment.amap.com/B0L1ZUNFUG/comment/%5B2026-02-12-19-08-37%5D989F2FA6-EE8E-4CA0-9D3A-6E4ADD7B6A1_1770894518338_10074396.jpg",
      "https://aos-comment.amap.com/B0L1ZUNFUG/comment/20260305-300d0c5a9ebbb9de913cde8f-2UjNNkJVmoq7wfzai8gWv6.jpg",
    ],
    hours: { daily: "11:00–21:00" },
    verified: true, verified_date: "2026-05-21",
  },
];

export const menuItems: MenuItem[] = [
  // === 虹桥素坊 GoodBridge ===
  { _id: "hongqiao-sufang-1", restaurant_id: "hongqiao-sufang", name_en: "Braised Mock Lion's Head", name_zh: "红烧素狮子头", description_en: "Giant tofu-and-vegetable patty braised in savory soy sauce.", price_rmb: 48, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "wheat"], display_order: 1 },
  { _id: "hongqiao-sufang-2", restaurant_id: "hongqiao-sufang", name_en: "Crispy Mock Chicken", name_zh: "招牌素鸡", description_en: "Pressed tofu skin roll, crispy outside, tender inside.", price_rmb: 38, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "wheat"], display_order: 2 },
  { _id: "hongqiao-sufang-3", restaurant_id: "hongqiao-sufang", name_en: "Mushroom & Bok Choy", name_zh: "香菇扒菜心", description_en: "Braised shiitake mushrooms over crisp bok choy.", price_rmb: 32, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 3 },
  { _id: "hongqiao-sufang-4", restaurant_id: "hongqiao-sufang", name_en: "Mock Dongpo Pork", name_zh: "素东坡肉", description_en: "Layered tofu skin shaped and braised to resemble the Hangzhou classic.", price_rmb: 52, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "wheat"], display_order: 4 },
  { _id: "hongqiao-sufang-5", restaurant_id: "hongqiao-sufang", name_en: "Silken Tofu Soup", name_zh: "三鲜豆腐羹", description_en: "Light soup with silken tofu and mushrooms. Contains egg.", price_rmb: 22, diet_tags: ["vegetarian"], allergen_free: [], allergen_contains: ["soy", "egg"], display_order: 5 },
  { _id: "hongqiao-sufang-6", restaurant_id: "hongqiao-sufang", name_en: "Buddha's Delight", name_zh: "罗汉斋", description_en: "18-ingredient vegetable and tofu medley slow-braised in sesame oil.", price_rmb: 42, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "sesame"], display_order: 6 },
  { _id: "hongqiao-sufang-7", restaurant_id: "hongqiao-sufang", name_en: "Breakfast Dim Sum Set", name_zh: "素食早茶套餐", description_en: "Morning set: steamed buns, congee, and seasonal sides (09:30–11:00).", price_rmb: 45, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 7 },
  { _id: "hongqiao-sufang-8", restaurant_id: "hongqiao-sufang", name_en: "Black Sesame Rice Balls", name_zh: "芝麻汤圆", description_en: "Sweet glutinous rice balls filled with black sesame paste.", price_rmb: 18, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["sesame"], display_order: 8 },

  // === 蟠龙庵 Panlong Temple ===
  { _id: "panlong-an-1", restaurant_id: "panlong-an", name_en: "Vegetarian Soup Noodles", name_zh: "素面", description_en: "House specialty — simple vegetable-broth noodles, ¥20/bowl.", price_rmb: 20, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 1 },
  { _id: "panlong-an-2", restaurant_id: "panlong-an", name_en: "Plain Congee", name_zh: "白粥", description_en: "Simple white rice porridge served with pickled vegetables on the side.", price_rmb: 8, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 2 },
  { _id: "panlong-an-3", restaurant_id: "panlong-an", name_en: "Steamed Bun", name_zh: "馒头", description_en: "Plain steamed wheat bun — simple temple fare.", price_rmb: 3, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 3 },
  { _id: "panlong-an-4", restaurant_id: "panlong-an", name_en: "Braised Tofu", name_zh: "红烧豆腐", description_en: "Firm tofu braised in light soy sauce — a simple temple side.", price_rmb: 12, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 4 },

  // === 素香珍 Suxiangzhen ===
  { _id: "suxiangzhen-1", restaurant_id: "suxiangzhen", name_en: "Glutinous Rice Mock Chicken", name_zh: "糯米素鸡", description_en: "Sticky rice wrapped in tofu skin, steamed and lightly glazed.", price_rmb: 32, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "wheat"], display_order: 1 },
  { _id: "suxiangzhen-2", restaurant_id: "suxiangzhen", name_en: "Stir-fried Seasonal Greens", name_zh: "炒时蔬", description_en: "Daily market vegetables wok-tossed with garlic and light seasoning.", price_rmb: 18, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 2 },
  { _id: "suxiangzhen-3", restaurant_id: "suxiangzhen", name_en: "Vegetarian Lunch Set", name_zh: "素食套餐", description_en: "Rice + two vegetable dishes + soup — good value set meal.", price_rmb: 38, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 3 },
  { _id: "suxiangzhen-4", restaurant_id: "suxiangzhen", name_en: "Braised Mock Spare Ribs", name_zh: "素排骨", description_en: "Konjac and tofu skin braised in soy sauce, shaped like ribs.", price_rmb: 36, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "wheat"], display_order: 4 },
  { _id: "suxiangzhen-5", restaurant_id: "suxiangzhen", name_en: "Mushroom Congee", name_zh: "香菇粥", description_en: "Slow-cooked rice porridge with shiitake mushrooms.", price_rmb: 14, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 5 },
  { _id: "suxiangzhen-6", restaurant_id: "suxiangzhen", name_en: "Vegetarian Dumplings", name_zh: "素饺子", description_en: "Pan-fried dumplings filled with cabbage, mushroom, and glass noodles.", price_rmb: 24, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 6 },
  { _id: "suxiangzhen-7", restaurant_id: "suxiangzhen", name_en: "Vegetable Fried Rice", name_zh: "素炒饭", description_en: "Wok-fried rice with mixed vegetables and light soy.", price_rmb: 20, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 7 },

  // === 悉发蔬苑 Xifa Vegetarian Garden ===
  { _id: "xifa-shuyuan-1", restaurant_id: "xifa-shuyuan", name_en: "Wild Mushroom Claypot", name_zh: "菌菇蔬菜煲", description_en: "Wild mushroom medley slow-cooked with root vegetables in clay pot.", price_rmb: 48, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 1 },
  { _id: "xifa-shuyuan-2", restaurant_id: "xifa-shuyuan", name_en: "Mapo Tofu (Vegan)", name_zh: "素麻婆豆腐", description_en: "Silky tofu in spicy vegan sauce with Sichuan numbing pepper.", price_rmb: 28, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 2 },
  { _id: "xifa-shuyuan-3", restaurant_id: "xifa-shuyuan", name_en: "Braised Eggplant", name_zh: "鱼香茄子（素）", description_en: "Braised eggplant in sweet-tangy sauce — no fish, fully vegan.", price_rmb: 32, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 3 },
  { _id: "xifa-shuyuan-4", restaurant_id: "xifa-shuyuan", name_en: "Mock Beef with Peppers", name_zh: "青椒素牛肉丝", description_en: "Shredded textured soy protein stir-fried with green peppers.", price_rmb: 36, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "wheat"], display_order: 4 },
  { _id: "xifa-shuyuan-5", restaurant_id: "xifa-shuyuan", name_en: "Pan-fried Lotus Root Cake", name_zh: "藕饼", description_en: "Lotus root patty stuffed with seasoned mushroom paste, pan-fried crispy.", price_rmb: 22, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 5 },
  { _id: "xifa-shuyuan-6", restaurant_id: "xifa-shuyuan", name_en: "Winter Melon & Tofu Soup", name_zh: "冬瓜豆腐汤", description_en: "Light and refreshing clear soup with winter melon and silken tofu.", price_rmb: 16, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 6 },
  { _id: "xifa-shuyuan-7", restaurant_id: "xifa-shuyuan", name_en: "Kung Pao Vegetables", name_zh: "宫保素丁", description_en: "Peanut and vegetable cubes in spicy-sweet Sichuan sauce.", price_rmb: 30, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["peanut", "soy"], display_order: 7 },
  { _id: "xifa-shuyuan-8", restaurant_id: "xifa-shuyuan", name_en: "Vegetable Noodle Soup", name_zh: "素汤面", description_en: "Wheat noodles in clear vegetable broth with seasonal toppings.", price_rmb: 22, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 8 },

  // === 大象无隅 Daxiang Wuyu ===
  { _id: "daxiang-wuyu-1", restaurant_id: "daxiang-wuyu", name_en: "Wild Mushroom Stone Pot Rice", name_zh: "野菌饭", description_en: "Stone pot rice topped with sautéed wild mushroom medley.", price_rmb: 38, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 1 },
  { _id: "daxiang-wuyu-2", restaurant_id: "daxiang-wuyu", name_en: "Cold Sesame Noodles", name_zh: "芝麻冷面", description_en: "Chilled noodles tossed in tahini-sesame sauce with cucumber strips.", price_rmb: 28, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "sesame"], display_order: 2 },
  { _id: "daxiang-wuyu-3", restaurant_id: "daxiang-wuyu", name_en: "Vegetable Spring Rolls", name_zh: "素春卷", description_en: "Crispy rolls stuffed with cabbage, glass noodles, and mushrooms.", price_rmb: 22, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 3 },
  { _id: "daxiang-wuyu-4", restaurant_id: "daxiang-wuyu", name_en: "Braised Lotus Root", name_zh: "红烧藕块", description_en: "Thick lotus root slices braised in caramelized soy sauce.", price_rmb: 26, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 4 },
  { _id: "daxiang-wuyu-5", restaurant_id: "daxiang-wuyu", name_en: "Garlic Green Beans", name_zh: "干煸四季豆", description_en: "Blistered green beans with garlic and light chili — crisp and fragrant.", price_rmb: 22, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 5 },
  { _id: "daxiang-wuyu-6", restaurant_id: "daxiang-wuyu", name_en: "Matcha & Red Bean Bun", name_zh: "抹茶豆沙包", description_en: "Steamed bun with sweet red bean filling and matcha-infused dough.", price_rmb: 14, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 6 },
  { _id: "daxiang-wuyu-7", restaurant_id: "daxiang-wuyu", name_en: "Taro Ball Dessert Soup", name_zh: "芋圆甜汤", description_en: "Warm sweet soup with chewy taro and yam balls.", price_rmb: 16, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 7 },

  // === 七宝教寺素斋部 Qibao Temple ===
  { _id: "qibao-temple-1", restaurant_id: "qibao-temple", name_en: "Temple Noodles", name_zh: "素斋面", description_en: "Simple vegetable soup noodles served canteen-style inside the temple.", price_rmb: 15, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 1 },
  { _id: "qibao-temple-2", restaurant_id: "qibao-temple", name_en: "Buddha's Delight Stew", name_zh: "罗汉全素", description_en: "Traditional 8-ingredient vegetarian stew from ancient Buddhist recipes.", price_rmb: 25, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 2 },
  { _id: "qibao-temple-3", restaurant_id: "qibao-temple", name_en: "Vegetarian Congee", name_zh: "素粥", description_en: "Plain rice porridge with peanuts and pickled vegetables.", price_rmb: 8, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["peanut"], display_order: 3 },
  { _id: "qibao-temple-4", restaurant_id: "qibao-temple", name_en: "Vegetarian Steamed Buns", name_zh: "素包子", description_en: "Soft steamed buns filled with mushroom and glass noodle stuffing.", price_rmb: 5, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 4 },
  { _id: "qibao-temple-5", restaurant_id: "qibao-temple", name_en: "Vegetable Fried Rice", name_zh: "素炒饭", description_en: "Simple wok-fried rice with cabbage, carrot, and corn.", price_rmb: 12, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 5 },
  { _id: "qibao-temple-6", restaurant_id: "qibao-temple", name_en: "Tofu Skin Rolls", name_zh: "腐皮卷", description_en: "Rolls of pressed tofu skin with minced mushroom stuffing, lightly pan-fried.", price_rmb: 18, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 6 },

  // === 全有斋面馆 Quanyouzhai ===
  { _id: "quanyouzhai-1", restaurant_id: "quanyouzhai", name_en: "Signature Vegetarian Soup Noodles", name_zh: "招牌素汤面", description_en: "The house specialty — thin noodles in clear mushroom broth.", price_rmb: 20, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 1 },
  { _id: "quanyouzhai-2", restaurant_id: "quanyouzhai", name_en: "Vegetarian Zhajiang Noodles", name_zh: "素炸酱面", description_en: "Noodles topped with rich soybean paste sauce and shredded cucumber.", price_rmb: 22, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 2 },
  { _id: "quanyouzhai-3", restaurant_id: "quanyouzhai", name_en: "Sesame Dry Noodles", name_zh: "素拌面", description_en: "Chewy noodles tossed in sesame oil, soy sauce, and vinegar.", price_rmb: 18, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "sesame", "soy"], display_order: 3 },
  { _id: "quanyouzhai-4", restaurant_id: "quanyouzhai", name_en: "Vegetarian Wonton Soup", name_zh: "素馄饨", description_en: "Thin-wrapped wontons with mushroom and vegetable filling in clear broth.", price_rmb: 24, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 4 },
  { _id: "quanyouzhai-5", restaurant_id: "quanyouzhai", name_en: "Mushroom Noodle Soup", name_zh: "香菇面", description_en: "Noodles in rich shiitake mushroom broth with whole braised mushrooms.", price_rmb: 22, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 5 },
  { _id: "quanyouzhai-6", restaurant_id: "quanyouzhai", name_en: "Stir-fried Noodles", name_zh: "素炒面", description_en: "Wok-tossed wheat noodles with seasonal greens and soy sauce.", price_rmb: 20, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 6 },
  { _id: "quanyouzhai-7", restaurant_id: "quanyouzhai", name_en: "Braised Tofu Add-on", name_zh: "加料：红烧豆腐", description_en: "Extra topping for any noodle — braised firm tofu.", price_rmb: 8, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 7 },

  // === 拌将 Banjiang (self-serve spicy pot) ===
  { _id: "banjiang-1", restaurant_id: "banjiang", name_en: "Tofu (Pick Your Own)", name_zh: "豆腐", description_en: "Soft or firm tofu cubes — key protein for a vegan spicy pot.", price_rmb: 4, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 1 },
  { _id: "banjiang-2", restaurant_id: "banjiang", name_en: "Enoki Mushrooms", name_zh: "金针菇", description_en: "Bundle of enoki — excellent soaked in spicy broth.", price_rmb: 3, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 2 },
  { _id: "banjiang-3", restaurant_id: "banjiang", name_en: "Thick Glass Noodles", name_zh: "宽粉", description_en: "Wide sweet-potato starch noodles — chewy and satisfying.", price_rmb: 4, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 3 },
  { _id: "banjiang-4", restaurant_id: "banjiang", name_en: "Tofu Skin", name_zh: "豆皮", description_en: "Thin dried tofu skin — silky when cooked in broth.", price_rmb: 3, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 4 },
  { _id: "banjiang-5", restaurant_id: "banjiang", name_en: "Mixed Vegetables", name_zh: "时蔬拼盘", description_en: "Broccoli, cauliflower, leafy greens — all vegan, skip the meat section.", price_rmb: 8, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 5 },
  { _id: "banjiang-6", restaurant_id: "banjiang", name_en: "Black Wood Ear Fungus", name_zh: "黑木耳", description_en: "Crunchy black fungus — adds texture and is high in iron.", price_rmb: 3, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 6 },

  // === 张亮麻辣烫 Zhang Liang ===
  { _id: "zhangliang-hongqiao-1", restaurant_id: "zhangliang-hongqiao", name_en: "Tofu (Vegetable Section)", name_zh: "豆腐", description_en: "Choose firm or silken tofu — labeled in the vegetable section.", price_rmb: 4, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 1 },
  { _id: "zhangliang-hongqiao-2", restaurant_id: "zhangliang-hongqiao", name_en: "Potato Slices", name_zh: "土豆片", description_en: "Thick potato slices that soak up the spicy broth beautifully.", price_rmb: 3, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 2 },
  { _id: "zhangliang-hongqiao-3", restaurant_id: "zhangliang-hongqiao", name_en: "Glass Noodles", name_zh: "粉条", description_en: "Sweet potato starch noodles — a must-pick for any bowl.", price_rmb: 3, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 3 },
  { _id: "zhangliang-hongqiao-4", restaurant_id: "zhangliang-hongqiao", name_en: "Shiitake Mushrooms", name_zh: "香菇", description_en: "Whole or halved shiitake — rich and meaty texture.", price_rmb: 4, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 4 },
  { _id: "zhangliang-hongqiao-5", restaurant_id: "zhangliang-hongqiao", name_en: "Broccoli", name_zh: "西兰花", description_en: "Florets — always available in the vegetable section.", price_rmb: 4, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 5 },
  { _id: "zhangliang-hongqiao-6", restaurant_id: "zhangliang-hongqiao", name_en: "Sesame Paste Sauce", name_zh: "芝麻酱底", description_en: "Signature creamy sesame paste — the flavor base for every bowl.", price_rmb: 0, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["sesame"], display_order: 6 },

  // === 塔尔兰 Taerlan (Xinjiang / Halal) ===
  { _id: "taerlan-1", restaurant_id: "taerlan", name_en: "Vegetable Hand-pulled Noodles", name_zh: "蔬菜拌面（素）", description_en: "Thick hand-pulled noodles tossed with wok-fried vegetables and chili. Ask for no meat.", price_rmb: 28, diet_tags: ["halal", "veg_options"], allergen_free: [], allergen_contains: ["wheat"], display_order: 1 },
  { _id: "taerlan-2", restaurant_id: "taerlan", name_en: "Big Plate Chicken (Halal)", name_zh: "大盘鸡", description_en: "Halal chicken braised with potatoes and thick belt noodles.", price_rmb: 58, diet_tags: ["halal"], allergen_free: [], allergen_contains: ["wheat"], display_order: 2 },
  { _id: "taerlan-3", restaurant_id: "taerlan", name_en: "Naan Bread", name_zh: "烤馕", description_en: "Sesame-seeded flatbread baked in tandoor — naturally vegan.", price_rmb: 8, diet_tags: ["halal", "vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "sesame"], display_order: 3 },
  { _id: "taerlan-4", restaurant_id: "taerlan", name_en: "Cold Skin Noodles", name_zh: "凉皮", description_en: "Chilled rice-noodle sheet with cucumber, black vinegar, and chili oil.", price_rmb: 18, diet_tags: ["halal", "vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "sesame"], display_order: 4 },
  { _id: "taerlan-5", restaurant_id: "taerlan", name_en: "Lamb Skewers", name_zh: "羊肉串", description_en: "Cumin-spiced halal lamb skewers — a Xinjiang signature.", price_rmb: 8, diet_tags: ["halal"], allergen_free: [], allergen_contains: [], display_order: 5 },
  { _id: "taerlan-6", restaurant_id: "taerlan", name_en: "Baked Lamb Pie (Samsa)", name_zh: "烤包子（撒马萨）", description_en: "Flaky baked pastry with spiced halal lamb and onion filling.", price_rmb: 12, diet_tags: ["halal"], allergen_free: [], allergen_contains: ["wheat"], display_order: 6 },
  { _id: "taerlan-7", restaurant_id: "taerlan", name_en: "Braised Eggplant (Halal)", name_zh: "红烧茄子（清真）", description_en: "Braised eggplant in halal soy sauce — a good vegetable option.", price_rmb: 22, diet_tags: ["halal", "vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy"], display_order: 7 },

  // === 芸山季 Yunshanji (Yunnan Mushroom Hot Pot) ===
  { _id: "yunshanji-1", restaurant_id: "yunshanji", name_en: "Mushroom Hot Pot Base (Veg)", name_zh: "素汤底（菌菇锅底）", description_en: "Rich wild mushroom vegetarian broth — ask for '素汤底' to confirm no meat.", price_rmb: 48, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: [], display_order: 1 },
  { _id: "yunshanji-2", restaurant_id: "yunshanji", name_en: "Yunnan Porcini Mushrooms", name_zh: "牛肝菌", description_en: "Premium Yunnan porcini — earthy and rich, the star of the menu.", price_rmb: 68, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: [], display_order: 2 },
  { _id: "yunshanji-3", restaurant_id: "yunshanji", name_en: "Tricholoma Mushrooms", name_zh: "鸡枞菌", description_en: "Delicate aromatic wild Yunnan mushroom — season-dependent.", price_rmb: 58, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: [], display_order: 3 },
  { _id: "yunshanji-4", restaurant_id: "yunshanji", name_en: "Mixed Mushroom Platter", name_zh: "菌菇拼盘", description_en: "Enoki, oyster, and king oyster mushrooms — good starter for the hot pot.", price_rmb: 38, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: [], display_order: 4 },
  { _id: "yunshanji-5", restaurant_id: "yunshanji", name_en: "Tofu & Vegetable Platter", name_zh: "素菜拼盘", description_en: "Mixed tofu and seasonal vegetables — good vegan hot pot add-on.", price_rmb: 42, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: ["soy"], display_order: 5 },
  { _id: "yunshanji-6", restaurant_id: "yunshanji", name_en: "Yunnan Rice Noodles", name_zh: "手工米线", description_en: "Yunnan-style thick rice noodles to finish the pot.", price_rmb: 18, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: [], display_order: 6 },
  { _id: "yunshanji-7", restaurant_id: "yunshanji", name_en: "Black Fungus Cold Salad", name_zh: "黑木耳凉拌", description_en: "Cold appetizer: black fungus with chili oil, garlic, and vinegar.", price_rmb: 22, diet_tags: ["vegan", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: [], display_order: 7 },

  // === 馬記云清真 Ma Ji Yun (Halal NW Noodles) ===
  { _id: "majiyu-qingzhen-1", restaurant_id: "majiyu-qingzhen", name_en: "Beef Hand-pulled Noodles", name_zh: "牛肉拉面", description_en: "Clear halal beef bone broth with hand-pulled wheat noodles and beef slices.", price_rmb: 22, diet_tags: ["halal"], allergen_free: [], allergen_contains: ["wheat"], display_order: 1 },
  { _id: "majiyu-qingzhen-2", restaurant_id: "majiyu-qingzhen", name_en: "Lamb Hand-pulled Noodles", name_zh: "羊肉面", description_en: "Halal lamb in clear broth over hand-pulled noodles.", price_rmb: 28, diet_tags: ["halal"], allergen_free: [], allergen_contains: ["wheat"], display_order: 2 },
  { _id: "majiyu-qingzhen-3", restaurant_id: "majiyu-qingzhen", name_en: "Vegetable Noodles (Halal)", name_zh: "素拉面（清真）", description_en: "Hand-pulled noodles with vegetables only — no meat. Good for vegetarian Muslims.", price_rmb: 16, diet_tags: ["halal", "vegetarian", "veg_options"], allergen_free: [], allergen_contains: ["wheat"], display_order: 3 },
  { _id: "majiyu-qingzhen-4", restaurant_id: "majiyu-qingzhen", name_en: "Wide Flat Noodles", name_zh: "宽面片", description_en: "Pappardelle-style flat noodles — request this width when ordering any broth.", price_rmb: 22, diet_tags: ["halal"], allergen_free: [], allergen_contains: ["wheat"], display_order: 4 },
  { _id: "majiyu-qingzhen-5", restaurant_id: "majiyu-qingzhen", name_en: "Steamed Bun", name_zh: "馒头", description_en: "Plain wheat bun — great for soaking up the broth.", price_rmb: 3, diet_tags: ["halal", "vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 5 },
  { _id: "majiyu-qingzhen-6", restaurant_id: "majiyu-qingzhen", name_en: "Tomato & Egg Noodles", name_zh: "西红柿鸡蛋面", description_en: "Comfort noodle soup with tomato and egg — lighter option.", price_rmb: 18, diet_tags: ["halal", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "egg"], display_order: 6 },

  // === GreenFriday 天素花园 ===
  { _id: "greenfriday-huiju-1", restaurant_id: "greenfriday-huiju", name_en: "Plant-based Burger", name_zh: "植物蛋白汉堡", description_en: "Juicy plant-based patty with house sauce, lettuce, and pickles.", price_rmb: 78, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat", "soy"], display_order: 1 },
  { _id: "greenfriday-huiju-2", restaurant_id: "greenfriday-huiju", name_en: "King Oyster Mushroom Steak", name_zh: "杏鲍菇牛排", description_en: "Giant king oyster mushroom grilled and served with seasonal sides.", price_rmb: 88, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 2 },
  { _id: "greenfriday-huiju-3", restaurant_id: "greenfriday-huiju", name_en: "Artisan Pappardelle", name_zh: "手工宽面", description_en: "House-made pasta with wild mushroom ragù and herb oil.", price_rmb: 68, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["wheat"], display_order: 3 },
  { _id: "greenfriday-huiju-4", restaurant_id: "greenfriday-huiju", name_en: "Coconut Curry", name_zh: "椰奶咖喱", description_en: "Creamy coconut milk curry with seasonal vegetables and tofu.", price_rmb: 68, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["soy", "coconut"], display_order: 4 },
  { _id: "greenfriday-huiju-5", restaurant_id: "greenfriday-huiju", name_en: "Roasted Vegetable Salad", name_zh: "烤时蔬沙拉", description_en: "Seasonal roasted vegetables over mixed greens with house dressing.", price_rmb: 48, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: ["sesame"], display_order: 5 },
  { _id: "greenfriday-huiju-6", restaurant_id: "greenfriday-huiju", name_en: "Truffle Fries", name_zh: "松露薯条", description_en: "Crispy fries in truffle oil — ask for vegan cheese to make fully vegan.", price_rmb: 38, diet_tags: ["vegetarian"], allergen_free: [], allergen_contains: ["dairy"], display_order: 6 },
  { _id: "greenfriday-huiju-7", restaurant_id: "greenfriday-huiju", name_en: "Matcha Tiramisu", name_zh: "抹茶提拉米苏", description_en: "Matcha twist on the Italian classic — dairy-free available on request.", price_rmb: 45, diet_tags: ["vegetarian"], allergen_free: [], allergen_contains: ["dairy", "wheat", "egg"], display_order: 7 },
  { _id: "greenfriday-huiju-8", restaurant_id: "greenfriday-huiju", name_en: "Cold-pressed Seasonal Juice", name_zh: "冷压果蔬汁", description_en: "Daily seasonal juice — always vegan.", price_rmb: 28, diet_tags: ["vegan", "vegetarian"], allergen_free: [], allergen_contains: [], display_order: 8 },
];

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug);
}

export function getMenuByRestaurantId(restaurantId: string): MenuItem[] {
  return menuItems
    .filter((m) => m.restaurant_id === restaurantId)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export function filterByDiet(tag: DietTag | "all"): Restaurant[] {
  if (tag === "all") return restaurants;
  if (tag === "vegan" || tag === "vegetarian") {
    return restaurants.filter(
      (r) => r.diet_tags.includes(tag) || r.diet_tags.includes("veg_options")
    );
  }
  return restaurants.filter((r) => r.diet_tags.includes(tag));
}

// Ordering card phrases from research
export const ORDERING_PHRASES = {
  vegan: [
    { zh: "我是纯素食者，完全不吃任何动物产品，包括肉类、蛋、奶、海鲜。", en: "I am vegan — no meat, eggs, dairy, or seafood of any kind." },
    { zh: "请不要放猪油、鸡精、蚝油和鱼露。", en: "Please do not use lard, chicken powder, oyster sauce, or fish sauce." },
    { zh: "炒菜请用植物油，不要用猪油。", en: "Please stir-fry with vegetable oil, not lard." },
    { zh: "汤底请用蔬菜汤，不要用猪骨汤或鸡汤。", en: "Please use vegetable broth, not pork bone or chicken broth." },
    { zh: "请问这道菜里有没有肉汤或者荤油？", en: "Does this dish contain any meat broth or animal fat?" },
  ],
  vegetarian: [
    { zh: "我是素食者，不吃肉类和海鲜，但可以吃鸡蛋和奶制品。", en: "I am vegetarian — no meat or seafood, but eggs and dairy are fine." },
    { zh: "请不要用猪油炒菜，用植物油就好。", en: "Please cook with vegetable oil, not lard." },
    { zh: "我不吃肉，但可以放葱和蒜。", en: "I don't eat meat, but scallions and garlic are fine." },
    { zh: "请问这道菜是用猪骨汤做的吗？", en: "Is this dish made with pork bone broth?" },
    { zh: "有没有不含肉的素菜推荐？", en: "Can you recommend any dishes without meat?" },
  ],
  halal: [
    { zh: "我是穆斯林，只能吃清真食品。请问你们有清真认证吗？", en: "I am Muslim and can only eat halal food. Is your restaurant halal certified?" },
    { zh: "请确认菜里没有猪肉、猪油和任何猪的成分。", en: "Please confirm: no pork, lard, or any pork-derived ingredients." },
    { zh: "这道菜做的时候有没有加料酒、黄酒或者绍兴酒？", en: "Was any cooking wine, yellow rice wine, or Shaoxing wine used?" },
    { zh: "炒菜用的是什么油？是猪油还是植物油？", en: "What oil was used for cooking — lard or vegetable oil?" },
    { zh: "请问有没有不含猪肉和酒精的菜品推荐？", en: "Can you recommend dishes with no pork and no alcohol?" },
  ],
};

// ── Curated reviews from 小红书 (manually verified, non-sponsored) ──────────
// 录入格式：把小红书评论原文粘贴给 Claude，Claude 翻译+格式化后加入此数组
export const reviews: Review[] = [
  {
    id: "xifa-r1",
    restaurant_id: "xifa-shuyuan",
    author_masked: "Ivy的素**",
    reviewer_type: "vegan",
    text_zh: "有时候看到颜值在线又好吃的素食店却空无一人，说不出的滋味，希望更多人发现这家宝藏小店。",
    text_en: "Sometimes you find a beautiful, delicious vegetarian restaurant that's completely empty — it's a bittersweet feeling. Hope more people discover this hidden gem.",
    source_url: "https://www.xiaohongshu.com/discovery/item/69f9f82d000000003502c539",
    approx_date: "2026-05",
  },
  {
    id: "suxiangzhen-r1",
    restaurant_id: "suxiangzhen",
    author_masked: "食草**",
    reviewer_type: "vegetarian",
    text_zh: "荠菜馄饨22元，口感只能说是一般，不算是吃过的素馄饨里出彩的。还买了10个素包子和4个煎包，老板赠了一份馄饨汤。小店两桌加一个柜台，有素汉堡、包子、米饭、馄饨等。",
    text_en: "The shepherd's purse wontons (¥22) were decent but not the most memorable veggie wontons I've had. Also grabbed 10 steamed buns and 4 pan-fried buns — the owner threw in a free wonton soup after I got a membership card. Tiny spot: two tables and a counter, serving veggie burgers, buns, rice bowls, and wontons.",
    source_url: "https://www.xiaohongshu.com/explore/684511660000000021008fc4",
    approx_date: "2025-06",
  },
  {
    id: "suxiangzhen-r2",
    restaurant_id: "suxiangzhen",
    author_masked: "速来素**",
    reviewer_type: "vegetarian",
    text_zh: "在上海市中心居然有那么价廉物美的一家素餐厅，好好吃。",
    text_en: "Can't believe there's such an affordable and delicious vegetarian restaurant right in central Shanghai. Absolutely worth it!",
    source_url: "https://www.xiaohongshu.com/explore/63a1c598000000001f00ec25",
    approx_date: "2022-12",
  },
];

export function getReviewsByRestaurantId(restaurantId: string): Review[] {
  return reviews.filter((r) => r.restaurant_id === restaurantId);
}

export function getReviewCount(restaurantId: string): number {
  return reviews.filter((r) => r.restaurant_id === restaurantId).length;
}
