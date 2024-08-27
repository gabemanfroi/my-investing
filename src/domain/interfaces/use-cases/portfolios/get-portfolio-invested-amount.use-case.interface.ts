export const GET_PORTFOLIO_INVESTED_AMOUNT_USE_CASE =
  'GET_PORTFOLIO_INVESTED_AMOUNT_USE_CASE';

export interface IGetPortfolioInvestedAmountUseCase {
  execute(portfolioId: number): Promise<number>;
}
