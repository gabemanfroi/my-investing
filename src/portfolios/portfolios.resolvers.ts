import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { GetUserPortfolioRequest } from 'src/graphql';
import { ReadPortfolioDto } from 'src/portfolios/dto/read-portfolio.dto';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query('getUserPortfolio')
  async getUserPortfolio(
    @Args('getUserPortfolioRequest')
    getUserPortfolioRequest: GetUserPortfolioRequest,
  ) {
    const response = await this.portfolioService.getUserPortfolio(
      getUserPortfolioRequest.userId,
    );

    return ReadPortfolioDto.toGetUserPortfolioResponse(response);
  }

  @Mutation('createPortfolio')
  @UseGuards(GqlAuthGuard)
  async createPortfolio(@CurrentUser() user: User) {
    console.log('user', user);
    return this.portfolioService.createPortfolio(user.id);
  }
}
