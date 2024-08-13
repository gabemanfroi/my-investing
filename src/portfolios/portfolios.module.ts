import { Module } from '@nestjs/common';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { PortfolioResolver } from 'src/portfolios/portfolios.resolvers';

@Module({
  providers: [PortfoliosService, PortfolioResolver],
})
export class PortfoliosModule {}
