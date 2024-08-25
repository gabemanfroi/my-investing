import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/modules/portfolios/portfolios.service';
import {
  GetPortfolioInvestedAmountRequest,
  GetPortfolioInvestedAmountResponse,
  GetUserPortfolioRequest,
  GetUserPortfolioResponse,
} from 'src/graphql';
import { ReadPortfolioDto } from 'src/modules/portfolios/dto/read-portfolio.dto';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query('getUserPortfolio')
  @UseGuards(GqlAuthGuard)
  async getUserPortfolio(
    @Args('getUserPortfolioRequest')
    request: GetUserPortfolioRequest,
  ): Promise<GetUserPortfolioResponse> {
    const response = await this.portfolioService.getUserPortfolio(
      Number(request.userId),
    );

    return ReadPortfolioDto.toGetUserPortfolioResponse(response);
  }

  @Query('getPortfolioInvestedAmount')
  @UseGuards(GqlAuthGuard)
  async getPortfolioInvestedAmount(
    @Args('getPortfolioInvestedAmountRequest')
    request: GetPortfolioInvestedAmountRequest,
  ): Promise<GetPortfolioInvestedAmountResponse> {
    console.log({ request });
    const totalInvestedAmount =
      await this.portfolioService.getPortfolioInvestedAmount(
        Number(request.portfolioId),
      );

    return { totalInvestedAmount };
  }

  @Query('getPortfolioVariation')
  @Mutation('createPortfolio')
  @UseGuards(GqlAuthGuard)
  async createPortfolio(@CurrentUser() user: User) {
    return this.portfolioService.createPortfolio(user.id);
  }
}
