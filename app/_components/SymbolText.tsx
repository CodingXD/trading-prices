"use client";

import useTradeStore from "@/store/trade";
import { Chip } from "@nextui-org/react";

export default function SymbolText() {
  const trade = useTradeStore((state) => state.trade);

  if (!trade) {
    return <></>;
  }

  return (
    <div className="flex items-center space-x-4 mb-2">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <Chip variant="bordered" color="primary" radius="sm">
        {trade.symbol}
      </Chip>
    </div>
  );
}
