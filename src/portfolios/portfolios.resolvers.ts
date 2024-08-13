import { Args, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/portfolios/portfolios.service';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query('GetUserPortfolio')
  async getUserPortfolio(@Args('userId') userId: number) {
    return this.portfolioService.getUserPortfolio(userId);
  }
}
