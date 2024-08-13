import { Args, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/portfolios/portfolios.service';

@Resolver('Portfolio')
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query('GetUserPortfolio')
  async getUserPortfolio(@Args('userId') userId: number) {
    return this.portfolioService.getUserPortfolio(userId);
  }
}
