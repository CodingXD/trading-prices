export type Trade = {
  timestamp: string;
  symbol: string;
  side: string;
  size: number;
  price: number;
  tickDirection?: string;
  trdMatchID?: string;
  grossValue?: number;
  homeNotional?: number;
  foreignNotional?: number;
  trdType?: string;
  key: number;
};

type TradeData = {
  symbol: string;
  id: number;
  side: string;
  size: number;
  price: number;
  timestamp: string;
};

export type SubscribeData = {
  table: string;
  action: string;
  data: TradeData[];
};
