import { Injectable } from '@nestjs/common';
import { StockMarketService } from 'src/modules/stock-market/interfaces/stock-market.service';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

interface BrapiQuoteResponse {
  results: {
    currency: string;
    shortName: string;
    longName: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: string;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    symbol: string;
    priceEarnings: number;
    earningsPerShare: number;
    logourl: string;
  };
}

const getTickerUrl = (ticker) =>
  `https://brapi.dev/api/quote/${ticker}?token=7LhZQt6cA9FgqgE8Tr2GDb`;

@Injectable()
export class StockMarketBrapiService implements StockMarketService {
  constructor(private readonly httpService: HttpService) {}

  async getStockPrice(ticker: string): Promise<number> {
    const { results } = await this.httpService
      .get<BrapiQuoteResponse>(getTickerUrl(ticker))
      .pipe(map((response) => response.data as BrapiQuoteResponse))
      .toPromise();

    return results[0].regularMarketPrice;
  }
}
