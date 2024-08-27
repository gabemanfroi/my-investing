import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockMarketBrapiService } from 'src/modules/stock-market/external/stock-market.brapi.service';
import { STOCK_MARKET_SERVICE } from 'src/modules/stock-market/interfaces/stock-market.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: STOCK_MARKET_SERVICE,
      useClass: StockMarketBrapiService,
    },
  ],
  exports: ['StockMarketService'],
})
export class StockMarketModule {}
