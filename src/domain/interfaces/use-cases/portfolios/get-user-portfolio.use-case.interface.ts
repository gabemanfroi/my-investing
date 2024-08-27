import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';

export const GET_USER_PORTFOLIO_USE_CASE = 'GET_USER_PORTFOLIO_USE_CASE';

export interface IGetUserPortfolioUseCase {
  execute(userId: number): Promise<ReadPortfolioDto>;
}
