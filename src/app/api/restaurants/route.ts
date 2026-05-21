import { NextResponse } from "next/server";
import { restaurants, menuItems } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const diet = searchParams.get("diet");
  const q = searchParams.get("q");

  let result = restaurants;

  if (diet && diet !== "all") {
    result = result.filter((r) => r.diet_tags.includes(diet as any));
  }

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(
      (r) =>
        r.name_en.toLowerCase().includes(query) ||
        r.name_zh.includes(query) ||
        r.diet_tags.some((t) => t.includes(query)) ||
        r.restaurant_type.includes(query)
    );
  }

  return NextResponse.json({
    count: result.length,
    restaurants: result,
  });
}
