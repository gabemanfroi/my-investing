import { Injectable } from '@nestjs/common';
import { IStockMarketService } from 'src/modules/stock-market/interfaces/stock-market.service';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { AppConfigService } from 'src/infra/config/app-config.service';

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

@Injectable()
export class StockMarketBrapiService implements IStockMarketService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async getStockPrice(symbol: string): Promise<number> {
    const { results } = await this.httpService
      .get<BrapiQuoteResponse>(this.getTickerUrl(symbol))
      .pipe(map((response) => response.data as BrapiQuoteResponse))
      .toPromise();

    return results[0].regularMarketPrice;
  }

  private getTickerUrl(symbol: string): string {
    return `${this.appConfigService.brapiApiHost}/quote/${symbol}?token=${this.appConfigService.brapiApiKey}`;
  }
}
