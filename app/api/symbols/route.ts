import type { Trade } from "@/types/bitmex";
import axios from "axios";
import { format, subDays } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    const count = request.nextUrl.searchParams.get("count");
    const params = {
      binSize: "1d",
      reverse: true,
      startTime: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    } as Record<string, string | boolean | number | Record<string, string>>;
    if (query) {
      params.filter = {
        symbol: query,
      };
    }
    if (count && !isNaN(Number(count))) {
      params.count = Number(count);
    }
    const { data } = await axios.get<Trade[]>(
      "https://www.bitmex.com/api/v1/trade/bucketed",
      {
        params,
      }
    );

    const responseWithKey = data.map((data, i: number) => ({
      ...data,
      key: i,
      symbol: data.symbol.slice(1),
    }));

    return NextResponse.json(responseWithKey);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
