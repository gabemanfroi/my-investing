import { Args, Query, Resolver } from '@nestjs/graphql';
import { PortfoliosService } from 'src/modules/portfolios/portfolios.service';
import {
  GetPortfolioInvestedAmountRequest,
  GetPortfolioInvestedAmountResponse,
  GetPortfolioVariationRequest,
  GetPortfolioVariationResponse,
  GetUserPortfolioRequest,
  GetUserPortfolioResponse,
} from 'src/graphql';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { QUERIES } from 'src/infra/core/constants/queries';
import {
  GET_USER_PORTFOLIO_USE_CASE,
  IGetUserPortfolioUseCase,
} from 'src/domain/interfaces/use-cases/portfolios/get-user-portfolio.use-case.interface';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(
    @Inject(GET_USER_PORTFOLIO_USE_CASE)
    private readonly getUserPortfolioUseCase: IGetUserPortfolioUseCase,
    private readonly portfolioService: PortfoliosService,
  ) {}

  @Query(QUERIES.GET_USER_PORTFOLIO)
  @UseGuards(GqlAuthGuard)
  async getUserPortfolio(
    @Args('getUserPortfolioRequest')
    request: GetUserPortfolioRequest,
  ): Promise<GetUserPortfolioResponse> {
    const response = await this.getUserPortfolioUseCase.execute(
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
}
