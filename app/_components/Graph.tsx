"use client";

import useSymbolStore from "@/store/symbol";
import type { SubscribeData } from "@/types/bitmex";
import { Button } from "@nextui-org/react";
import { format } from "date-fns";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function Graph() {
  const symbol = useSymbolStore((state) => state.symbol);
  const ref = useRef<HTMLDivElement>(null);
  let ws: WebSocket | null = null;

  useEffect(() => {
    if (!ref.current || !symbol) return;
    const chart = createChart(ref.current, { height: 300 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
      { time: "2019-04-11", value: 80.01 },
      { time: "2019-04-12", value: 96.63 },
      { time: "2019-04-13", value: 76.64 },
      { time: "2019-04-14", value: 81.89 },
      { time: "2019-04-15", value: 74.43 },
      { time: "2019-04-16", value: 80.01 },
      { time: "2019-04-17", value: 96.63 },
      { time: "2019-04-18", value: 76.64 },
      { time: "2019-04-19", value: 81.89 },
      { time: "2019-04-20", value: 74.43 },
    ]);

    ws = new WebSocket(
      `wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:${symbol}`
    );
    ws.onerror = (ev) => console.log(ev);
    ws.onmessage = (msg) => {
      const message = JSON.parse(msg.data) as SubscribeData;
      for (let i = 0; i < message.data?.length || 0; i++) {
        const { timestamp, price } = message.data[i];
        console.log(message.data);
        lineSeries.update({
          time: format(timestamp, "yyyy-MM-dd"),
          value: price,
        });
      }
    };

    return () => {
      chart.remove();
      ws?.close();
    };
  }, [symbol]);

  useEffect(() => {
    if (!symbol && ws) ws.close();
  }, [symbol]);

  return (
    <>
      <Button onPress={() => ws?.close()}>Stop Listening</Button>
      <div ref={ref} className="w-full"></div>
    </>
  );
}
