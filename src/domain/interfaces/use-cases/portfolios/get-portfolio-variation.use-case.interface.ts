export const GET_PORTFOLIO_VARIATION_USE_CASE =
  'GET_PORTFOLIO_VARIATION_USE_CASE';

export interface IGetPortfolioVariationUseCase {
  execute(portfolioId: string): Promise<{
    valueVariation: number;
    percentageVariation: number;
  }>;
}
