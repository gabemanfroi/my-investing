import { GET_USER_PORTFOLIO_USE_CASE } from 'src/domain/interfaces/use-cases/portfolios/get-user-portfolio.use-case.interface';
import { GetUserPortfolioUseCase } from 'src/application/useCases/portfolios/get-user-portfolio.use-case';

export const useCasesProviders = [
  { provide: GET_USER_PORTFOLIO_USE_CASE, useClass: GetUserPortfolioUseCase },
];
