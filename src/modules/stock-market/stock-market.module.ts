import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockMarketBrapiService } from 'src/modules/stock-market/external/stock-market.brapi.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'StockMarketService',
      useClass: StockMarketBrapiService,
    },
  ],
  exports: ['StockMarketService'],
})
export class StockMarketModule {}
