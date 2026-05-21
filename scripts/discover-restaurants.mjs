/**
 * VeganEats China — 餐厅候选发现脚本
 * 用高德 POI 搜索虹桥阿里中心周边素食餐厅
 *
 * 运行方式：
 *   AMAP_KEY=你的key node scripts/discover-restaurants.mjs
 *
 * 或直接改下面的 AMAP_KEY 变量
 */

const AMAP_KEY = process.env.AMAP_KEY || "YOUR_KEY_HERE";
const BASE = "https://restapi.amap.com/v3";

// 虹桥阿里中心（申长路688号）坐标 —— 先用 geocode 精确获取
const VENUE_ADDRESS = "上海市闵行区申长路688号虹桥商务区阿里中心";
const RADIUS_METERS = 5000; // 5km范围，覆盖虹桥商圈

// 搜索关键词组合（逐个跑，合并去重）
const KEYWORDS = [
  "素食",
  "蔬食",
  "纯素",
  "素菜馆",
  "斋菜",
  "斋饭",
  "素坊",
  "清真",
];

// 高德餐饮大类 type code
const POI_TYPE = "050000";

// ─── Step 1: 获取阿里中心精确坐标 ───────────────────────────────────────────
async function geocode(address) {
  const url = `${BASE}/geocode/geo?address=${encodeURIComponent(address)}&city=上海&key=${AMAP_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "1" || !data.geocodes?.length) {
    throw new Error(`Geocode failed: ${data.info}`);
  }

  const [lng, lat] = data.geocodes[0].location.split(",").map(Number);
  console.log(`\n📍 阿里中心坐标: ${lng}, ${lat}`);
  console.log(`   地址确认: ${data.geocodes[0].formatted_address}\n`);
  return { lng, lat };
}

// ─── Step 2: POI 搜索 ────────────────────────────────────────────────────────
async function searchPOI(keyword, center) {
  const url =
    `${BASE}/place/around` +
    `?key=${AMAP_KEY}` +
    `&location=${center.lng},${center.lat}` +
    `&keywords=${encodeURIComponent(keyword)}` +
    `&types=${POI_TYPE}` +
    `&radius=${RADIUS_METERS}` +
    `&sortrule=distance` +
    `&offset=50` +
    `&page=1` +
    `&extensions=all`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "1") {
    console.warn(`  ⚠️  关键词"${keyword}"搜索失败: ${data.info}`);
    return [];
  }

  return data.pois || [];
}

// ─── Step 3: 计算步行分钟数（直线距离估算，1km/12min步速）─────────────────────
function walkMinutes(distanceMeters) {
  return Math.round(distanceMeters / 80); // 80m/min 约合步行速度
}

// ─── Step 4: 合并去重 + 格式化输出 ───────────────────────────────────────────
function dedup(pois) {
  const seen = new Set();
  return pois.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

function formatResult(pois, center) {
  return pois
    .map((p) => {
      const [lng, lat] = p.location.split(",").map(Number);
      const dist = p.distance || "?";
      const mins = typeof dist === "number" ? walkMinutes(dist) : "?";

      return {
        id: p.id,
        name_zh: p.name,
        address_zh: p.address || p.pname + p.cityname + p.adname,
        lat,
        lng,
        distance_m: parseInt(dist) || null,
        walk_minutes: mins,
        tel: p.tel || null,
        business_hours: p.business_area || null,
        // 高德返回的营业时间字段（不一定有）
        opentime: p.opentime_today || p.opentime_week || null,
        type_zh: p.type,
        photos: p.photos?.slice(0, 1).map((x) => x.url) || [],
      };
    })
    .sort((a, b) => (a.distance_m || 9999) - (b.distance_m || 9999));
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (AMAP_KEY === "YOUR_KEY_HERE") {
    console.error("❌ 请设置 AMAP_KEY 环境变量或修改脚本中的 AMAP_KEY 变量");
    process.exit(1);
  }

  console.log("🔍 VeganEats China — 餐厅发现脚本");
  console.log("=".repeat(50));

  // Step 1: 获取坐标
  const center = await geocode(VENUE_ADDRESS);

  // Step 2: 逐关键词搜索
  let allPois = [];
  for (const kw of KEYWORDS) {
    process.stdout.write(`  搜索关键词: "${kw}" ... `);
    const pois = await searchPOI(kw, center);
    console.log(`找到 ${pois.length} 条`);
    allPois = allPois.concat(pois);

    // 高德限速保护：每次请求间隔600ms（避免QPS超限）
    await new Promise((r) => setTimeout(r, 600));
  }

  // Step 3: 去重 + 格式化
  const unique = dedup(allPois);
  const results = formatResult(unique, center);

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ 共找到 ${results.length} 家候选餐厅（去重后）`);
  console.log(`   范围: 虹桥阿里中心 ${RADIUS_METERS}m 内\n`);

  // Step 4: 打印表格
  results.forEach((r, i) => {
    console.log(
      `${String(i + 1).padStart(2)}. ${r.name_zh}`
    );
    console.log(
      `    📍 ${r.address_zh}`
    );
    console.log(
      `    🚶 ${r.distance_m}m / 约${r.walk_minutes}分钟  📞 ${r.tel || "无电话"}`
    );
    if (r.opentime) console.log(`    🕐 ${r.opentime}`);
    console.log(`    坐标: ${r.lng}, ${r.lat}  ID: ${r.id}`);
    console.log();
  });

  // Step 5: 输出 JSON 供后续使用
  const outputPath = new URL("../data/restaurant-candidates.json", import.meta.url);
  const fs = await import("fs/promises");
  await fs.mkdir(new URL("../data", import.meta.url), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify({ center, generated_at: new Date().toISOString(), restaurants: results }, null, 2)
  );

  console.log(`\n💾 JSON 已保存至: data/restaurant-candidates.json`);
  console.log(
    `\n下一步：逐个人工确认哪些真的有素食选项，标注 vegan/vegetarian/halal_friendly`
  );
}

main().catch((e) => {
  console.error("❌ 错误:", e.message);
  process.exit(1);
});
