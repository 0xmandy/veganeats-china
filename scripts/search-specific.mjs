/**
 * 搜索指定餐厅名称，获取坐标和基本信息
 * 运行：AMAP_KEY=xxx node scripts/search-specific.mjs
 */

const AMAP_KEY = process.env.AMAP_KEY || "YOUR_KEY_HERE";
const BASE = "https://restapi.amap.com/v3";
const CENTER = "121.315395,31.192742"; // 虹桥阿里中心

const TARGETS = [
  "邵公子的受益",
  "悉发蔬苑",
  "大象无隅",
  "Green Friday",
  "天空花园",
  "张亮麻辣烫",
  "杨国福麻辣烫",
  "拌酱",
];

function distanceKm(lng1, lat1, lng2, lat2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function searchByName(name) {
  const url =
    `${BASE}/place/text` +
    `?key=${AMAP_KEY}` +
    `&keywords=${encodeURIComponent(name)}` +
    `&city=上海` +
    `&citylimit=true` +
    `&offset=5` +
    `&extensions=all`;

  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "1" || !data.pois?.length) return [];
  return data.pois;
}

async function main() {
  const [cLng, cLat] = CENTER.split(",").map(Number);
  console.log("🔍 搜索指定餐厅\n" + "=".repeat(60));

  for (const name of TARGETS) {
    await new Promise((r) => setTimeout(r, 600));
    const pois = await searchByName(name);

    if (!pois.length) {
      console.log(`\n❌ "${name}" — 未找到`);
      continue;
    }

    console.log(`\n✅ "${name}" — 找到 ${pois.length} 条结果：`);
    pois.forEach((p, i) => {
      const [lng, lat] = p.location.split(",").map(Number);
      const dist = distanceKm(cLng, cLat, lng, lat).toFixed(1);
      console.log(`   ${i + 1}. ${p.name}`);
      console.log(`      📍 ${p.address || p.pname + p.adname}`);
      console.log(`      📏 距阿里中心 ${dist}km  📞 ${p.tel || "无"}`);
      console.log(`      坐标: ${p.location}  ID: ${p.id}`);
    });
  }
}

main().catch(console.error);
