import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';

export const CREATE_PORTFOLIO_USE_CASE = 'CREATE_PORTFOLIO_USE_CASE';

export interface ICreatePortfolioUseCase {
  execute(userId: number): Promise<ReadPortfolioDto>;
}
