export interface StockMarketService {
  getStockPrice(ticker: string): Promise<number>;
}
