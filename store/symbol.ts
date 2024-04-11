import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SymbolState = {
  symbol: string | null;
  setSymbol: (symbol: string | null) => void;
};

const useSymbolStore = create<SymbolState>()(
  persist(
    (set) => ({
      symbol: null,
      setSymbol: (symbol) => set({ symbol }),
    }),
    {
      name: "symbol",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSymbolStore;
