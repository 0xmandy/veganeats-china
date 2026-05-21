import { NextResponse } from "next/server";
import { getRestaurantBySlug, getMenuByRestaurantId } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const restaurant = getRestaurantBySlug(params.id);
  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  const menu = getMenuByRestaurantId(restaurant._id);
  return NextResponse.json({ restaurant, menu });
}
