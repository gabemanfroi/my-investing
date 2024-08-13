import { Args, Query, Resolver } from '@nestjs/graphql';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@Resolver('Portfolio')
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Query('GetUserPortfolio')
  async getUserPortfolio(@Args('userId') userId: number) {
    return this.portfolioService.getUserPortfolio(userId);
  }
}
