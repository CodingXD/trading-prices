import { Trade } from "@/types/bitmex";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL("https://www.bitmex.com/api/v1/trade");
  const query = request.nextUrl.searchParams.get("query");
  if (query) {
    url.searchParams.set("symbol", query);
  }
  const resp = await fetch(url.toString());
  const json = await resp.json();
  const responseWithKey = json.map((data: Trade, i: number) => ({
    ...data,
    key: i,
    symbol: data.symbol.slice(1),
  }));
  return NextResponse.json<Trade>(responseWithKey);
}
