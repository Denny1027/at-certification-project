export interface StockItem {
  name?: string;
  symbol?: string;
  changeToday?: number;
  openingPrice?: number;
  highPrice?: number;
  currentPrice?: number;
}

export interface SentimentItem {
  name: string;
  symbol: string;
  month: number;
  change: number;
  mspr: number;
}

export interface QuoteResponse {
  c: number; //Current price
  d: number; //Change
  dp: number; //Percent change
  h: number; //High price of the day
  l: number; //Low price of the day
  o: number; //Open price of the day
  pc: number; //Previuous close price
  t: number; // NOT FOUNDED ON DOCS
}

export interface SymbolResponse {
  count: number;
  result: SymbolItemResponse[];
}

export interface SymbolItemResponse {
  description?: string;
  displaySymbol?: string;
  symbol?: string;
  type?: string;
}

export interface InsiderSentimentResponse {
  data: InsiderSentimentItemResponse[];
  symbol: string;
  name?: string;
}

export interface InsiderSentimentItemResponse {
  change: number; //Net buying/selling from all insiders' transactions.
  month: number; //Month
  mspr: number; //Monthly share purchase ratio.
  symbol: number; //Symbol
  year: number; //Year.
}

export interface StockSentiment {
  name: string;
  symbol: string;
  monthsData: MonthStockSentiment[];
}

export interface MonthStockSentiment {
  date: Date;
  change?: number;
  mspr?: number;
}
