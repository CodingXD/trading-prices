import type { Trade } from "@/types/bitmex";
import { create } from "zustand";

type TradeState = {
  trade: Trade | null;
  setTrade: (trade: Trade | null) => void;
};

const useTradeStore = create<TradeState>()((set) => ({
  trade: null,
  setTrade: (trade) => set({ trade }),
}));

export default useTradeStore;
