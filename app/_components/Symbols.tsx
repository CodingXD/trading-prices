"use client";

import { fetcher } from "@/lib/utils/fetcher";
import useSymbolStore from "@/store/symbol";
import { Trade } from "@/types/bitmex";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "react-stately";

export default function Symbols() {
  const { symbol, setSymbol } = useSymbolStore();
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
        if ((!filterText || filterText.length < 3) && !symbol) {
          setSymbol(null);
        } else {
          setSymbol(filterText);
        }
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
