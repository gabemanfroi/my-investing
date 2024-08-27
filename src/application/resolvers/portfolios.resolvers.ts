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
import {
  GET_PORTFOLIO_INVESTED_AMOUNT_USE_CASE,
  IGetPortfolioInvestedAmountUseCase,
} from 'src/domain/interfaces/use-cases/portfolios/get-portfolio-invested-amount.use-case.interface';
import {
  GET_PORTFOLIO_VARIATION_USE_CASE,
  IGetPortfolioVariationUseCase,
} from 'src/application/useCases/portfolios/get-portfolio-variation.use-case';

@Resolver('Portfolios')
export class PortfoliosResolver {
  constructor(
    @Inject(GET_USER_PORTFOLIO_USE_CASE)
    private readonly getUserPortfolioUseCase: IGetUserPortfolioUseCase,
    @Inject(GET_PORTFOLIO_INVESTED_AMOUNT_USE_CASE)
    private readonly getPortfolioInvestedAmountUseCase: IGetPortfolioInvestedAmountUseCase,
    @Inject(GET_PORTFOLIO_VARIATION_USE_CASE)
    private readonly getPortfolioVariationUseCase: IGetPortfolioVariationUseCase,
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
      await this.getPortfolioInvestedAmountUseCase.execute(
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
    return this.getPortfolioVariationUseCase.execute(request.portfolioId);
  }
}
