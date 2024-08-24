import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/modules/portfolios/portfolios.service';
import { GetUserPortfolioRequest } from 'src/graphql';
import { ReadPortfolioDto } from 'src/modules/portfolios/dto/read-portfolio.dto';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';

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
    return this.portfolioService.createPortfolio(user.id);
  }
}
