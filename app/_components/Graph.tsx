"use client";

import { fetcher } from "@/lib/utils/fetcher";
import useTradeStore from "@/store/trade";
import type { Trade } from "@/types/bitmex";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function Graph() {
  const trade = useTradeStore((state) => state.trade);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useQuery<Trade[]>({
    queryKey: [trade?.symbol],
    queryFn: () =>
      fetcher
        .get(`/api/symbols?query=${trade!.symbol}&count=1000`)
        .then((resp) => resp.data),
    enabled: !!trade?.symbol,
  });

  useEffect(() => {
    if (!ref.current || !trade?.symbol) return;
    if (!data) return;
    const chart = createChart(ref.current, { height: 300 });
    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData(
      data.map(({ close, high, low, open }, i) => ({
        time: format(addDays(new Date(), i + 1), "yyyy-MM-dd"),
        close,
        high,
        low,
        open,
      }))
    );

    return () => chart.remove();
  }, [data]);

  return <div ref={ref} className="w-full"></div>;
}
