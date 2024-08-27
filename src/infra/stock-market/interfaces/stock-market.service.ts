export const STOCK_MARKET_SERVICE = 'StockMarketService';

export interface IStockMarketService {
  getStockPrice(symbol: string): Promise<number>;
}
