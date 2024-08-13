import { Module } from '@nestjs/common';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { PortfoliosResolver } from 'src/portfolios/portfolios.resolvers';

@Module({
  providers: [PortfoliosService, PortfoliosResolver],
})
export class PortfoliosModule {}
