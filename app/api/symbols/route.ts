import type { Trade } from "@/types/bitmex";
import axios from "axios";
import { subDays } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    const { data } = await axios.get<Trade[]>(
      "https://www.bitmex.com/api/v1/trade/bucketed",
      {
        params: {
          binSize: "1d",
          reverse: true,
          startTime: subDays(new Date(), 30),
          symbol: query ?? undefined,
        },
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
