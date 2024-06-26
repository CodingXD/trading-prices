"use client";

import { fetcher } from "@/lib/utils/fetcher";
import useTradeStore from "@/store/trade";
import { Trade } from "@/types/bitmex";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useAsyncList } from "react-stately";

export default function Symbols() {
  const { trade, setTrade } = useTradeStore();
  const list = useAsyncList<Trade>({
    async load({ signal, filterText }) {
      const { data } = await fetcher.get<Trade[]>("/api/symbols", {
        signal,
        params: {
          query: filterText,
        },
      });

      return {
        items: data,
      };
    },
  });

  return (
    <div>
      <h3
        className={`mt-5 text-base font-semibold leading-6 text-gray-900 ${
          !trade ? "animate-bounce" : "hidden"
        }`}
      >
        Find your crypto
      </h3>
      <Autocomplete
        className="max-w-xs"
        inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}
        label="Symbol"
        placeholder="Type to search..."
        variant="bordered"
        onInputChange={(filterText) => {
          list.setFilterText(filterText);
          if ((!filterText || filterText.length < 3) && !trade?.symbol) {
            setTrade(null);
          }
        }}
        onSelectionChange={(key: any) => {
          setTrade(list.items[key]);
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.key} className="capitalize">
            {item.symbol}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
