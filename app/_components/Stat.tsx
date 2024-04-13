"use client";

import useTradeStore from "@/store/trade";
import type { Trade } from "@/types/bitmex";

type Props = {
  tradeKey: keyof Pick<Trade, "open" | "close" | "high" | "low">;
};

export default function Stat({ tradeKey }: Props) {
  const trade = useTradeStore((state) => state.trade);
  if (!trade) {
    return <></>;
  }

  return (
    <div className="overflow-hidden rounded-lg bg-gray-900/5 px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500 capitalize">
        {tradeKey}
      </dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {trade[tradeKey] || 0}
      </dd>
    </div>
  );
}
