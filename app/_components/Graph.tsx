"use client";

import useTradeStore from "@/store/trade";
import type { SubscribeData } from "@/types/bitmex";
import { Button } from "@nextui-org/react";
import { format } from "date-fns";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function Graph() {
  const trade = useTradeStore((state) => state.trade);
  const ref = useRef<HTMLDivElement>(null);
  let ws: WebSocket | null = null;

  useEffect(() => {
    if (!ref.current || !trade?.symbol) return;
    const chart = createChart(ref.current, { height: 300 });
    const candleSeries = chart.addCandlestickSeries();

    const data = [] as any[];

    ws = new WebSocket(
      `wss://ws.bitmex.com/realtime?subscribe=instrument,tradeBin1d=${trade.symbol}`
    );
    ws.onerror = (ev) => console.log(ev);
    ws.onmessage = (msg) => {
      const message = JSON.parse(msg.data) as SubscribeData;
      for (let i = 0; i < message.data?.length || 0; i++) {
        const {
          timestamp,
          lastPrice = 0,
          highPrice = 0,
          lowPrice = 0,
          openValue = 0,
        } = message.data[i];
        console.log(message.data[i]);
        data.push(message.data[i]);
        candleSeries.update({
          time: format(timestamp, "yyyy-MM-dd"),
          close: lastPrice,
          high: highPrice,
          low: lowPrice,
          open: openValue,
        });
      }
    };
    ws.onclose = () => console.log(data);

    return () => {
      chart.remove();
      ws?.close();
    };
  }, [trade?.symbol]);

  useEffect(() => {
    if (!trade?.symbol && ws) ws.close();
  }, [trade?.symbol]);

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Button onPress={() => ws?.close()}>Stop Listening</Button>
      <div ref={ref} className="w-full"></div>
    </div>
  );
}
