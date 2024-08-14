import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { GetUserPortfolioRequest } from 'src/graphql';
import { ReadPortfolioDto } from 'src/portfolios/dto/read-portfolio.dto';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query('GetUserPortfolio')
  async getUserPortfolio(
    @Args('getUserPortfolioRequest')
    getUserPortfolioRequest: GetUserPortfolioRequest,
  ) {
    const response = await this.portfolioService.getUserPortfolio(
      getUserPortfolioRequest.userId,
    );

    return ReadPortfolioDto.toGetUserPortfolioResponse(response);
  }

  @Mutation('CreatePortfolio')
  async createPortfolio(@Args('userId') userId: number) {
    return this.portfolioService.createPortfolio(userId);
  }
}
