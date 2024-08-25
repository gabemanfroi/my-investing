import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/modules/portfolios/portfolios.service';
import {
  GetPortfolioInvestedAmountRequest,
  GetPortfolioInvestedAmountResponse,
  GetPortfolioVariationRequest,
  GetPortfolioVariationResponse,
  GetUserPortfolioRequest,
  GetUserPortfolioResponse,
} from 'src/graphql';
import { ReadPortfolioDto } from 'src/modules/portfolios/dto/read-portfolio.dto';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { QUERIES } from 'src/infra/core/constants/queries';
import { MUTATIONS } from 'src/infra/core/constants/mutations';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(private readonly portfolioService: PortfoliosService) {}

  @Query(QUERIES.GET_USER_PORTFOLIO)
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

  @Query(QUERIES.GET_PORTFOLIO_INVESTED_AMOUNT)
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

  @Query(QUERIES.GET_PORTFOLIO_VARIATION)
  @UseGuards(GqlAuthGuard)
  async getPortfolioVariation(
    @Args('getPortfolioVariationRequest')
    request: GetPortfolioVariationRequest,
  ): Promise<GetPortfolioVariationResponse> {
    return this.portfolioService.getPortfolioVariation(request.portfolioId);
  }

  @Mutation(MUTATIONS.CREATE_PORTFOLIO)
  @UseGuards(GqlAuthGuard)
  async createPortfolio(@CurrentUser() user: User) {
    return null;
    return this.portfolioService.createPortfolio(user.id);
  }
}
