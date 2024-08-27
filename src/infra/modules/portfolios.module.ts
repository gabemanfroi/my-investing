import { Module } from '@nestjs/common';
import { PortfoliosService } from 'src/modules/portfolios/portfolios.service';
import { PortfoliosResolver } from 'src/application/resolvers/portfolios.resolvers';
import { DatabaseModule } from 'src/infra/database/database.module';
import { StockMarketModule } from 'src/modules/stock-market/stock-market.module';
import { CommonAuthModule } from 'src/infra/core/common-auth/common-auth.module';
import { portfoliosProviders } from 'src/infra/providers/portfolios';

@Module({
  imports: [DatabaseModule, CommonAuthModule, StockMarketModule],
  providers: [PortfoliosService, PortfoliosResolver, ...portfoliosProviders],
})
export class PortfoliosModule {}
