import { Module } from '@nestjs/common';
import { PortfoliosResolver } from 'src/application/resolvers/portfolios.resolvers';
import { DatabaseModule } from 'src/infra/database/database.module';
import { StockMarketModule } from 'src/infra/stock-market/stock-market.module';
import { CommonAuthModule } from 'src/infra/core/common-auth/common-auth.module';
import { portfoliosProviders } from 'src/infra/providers/portfolios';

@Module({
  imports: [DatabaseModule, CommonAuthModule, StockMarketModule],
  providers: [PortfoliosResolver, ...portfoliosProviders],
})
export class PortfoliosModule {}
