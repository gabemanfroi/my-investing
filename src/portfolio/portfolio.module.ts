import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioResolver } from 'src/portfolio/portfolio.resolvers';

@Module({
  providers: [PortfolioService, PortfolioResolver],
})
export class PortfolioModule {}
