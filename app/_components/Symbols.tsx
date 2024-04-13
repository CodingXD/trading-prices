"use client";

import { fetcher } from "@/lib/utils/fetcher";
import useTradeStore from "@/store/trade";
import { Trade } from "@/types/bitmex";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "react-stately";

export default function Symbols() {
  const { trade, setTrade } = useTradeStore();
  const list = useAsyncList<Trade>({
    async load({ signal, filterText }) {
      const { data } = await fetcher.get<Trade[]>(
        `/api/symbols?query=${filterText}`,
        { signal }
      );

      return {
        items: data,
      };
    },
  });

  return (
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
  );
}
