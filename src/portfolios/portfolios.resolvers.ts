import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/portfolios/portfolios.service';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query('GetUserPortfolio')
  async getUserPortfolio(@Args('userId') userId: number) {
    return this.portfolioService.getUserPortfolio(userId);
  }

  @Mutation('CreatePortfolio')
  async createPortfolio(@Args('userId') userId: number) {
    return this.portfolioService.createPortfolio(userId);
  }
}
