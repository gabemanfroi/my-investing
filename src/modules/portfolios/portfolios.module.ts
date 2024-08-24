import { Module } from '@nestjs/common';
import { PortfoliosService } from 'src/modules/portfolios/portfolios.service';
import { PortfoliosResolver } from 'src/modules/portfolios/portfolios.resolvers';
import { portfoliosProviders } from 'src/modules/portfolios/portfolios.providers';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StockMarketModule } from 'src/modules/stock-market/stock-market.module';

@Module({
  imports: [DatabaseModule, AuthModule, StockMarketModule],
  providers: [PortfoliosService, PortfoliosResolver, ...portfoliosProviders],
})
export class PortfoliosModule {}
