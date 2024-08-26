export interface StockMarketService {
  getStockPrice(symbol: string): Promise<number>;
}
