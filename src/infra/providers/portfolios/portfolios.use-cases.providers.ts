import { GET_USER_PORTFOLIO_USE_CASE } from 'src/domain/interfaces/use-cases/portfolios/get-user-portfolio.use-case.interface';
import { GetUserPortfolioUseCase } from 'src/application/useCases/portfolios/get-user-portfolio.use-case';
import { CreatePortfolioUseCase } from 'src/application/useCases/portfolios/create-portfolio.use-case';
import { CREATE_PORTFOLIO_USE_CASE } from 'src/domain/interfaces/use-cases/portfolios/create-portfolio.use-case.interface';
import { GET_PORTFOLIO_INVESTED_AMOUNT_USE_CASE } from 'src/domain/interfaces/use-cases/portfolios/get-portfolio-invested-amount.use-case.interface';
import { GetPortfolioInvestedAmountUseCase } from 'src/application/useCases/portfolios/get-portfolio-invested-amount.use-case';
import { GET_PORTFOLIO_VARIATION_USE_CASE } from 'src/domain/interfaces/use-cases/portfolios/get-portfolio-variation.use-case.interface';
import { GetPortfolioVariationUseCase } from 'src/application/useCases/portfolios/get-portfolio-variation.use-case';

export const useCasesProviders = [
  { provide: GET_USER_PORTFOLIO_USE_CASE, useClass: GetUserPortfolioUseCase },
  { provide: CREATE_PORTFOLIO_USE_CASE, useClass: CreatePortfolioUseCase },
  {
    provide: GET_PORTFOLIO_INVESTED_AMOUNT_USE_CASE,
    useClass: GetPortfolioInvestedAmountUseCase,
  },
  {
    provide: GET_PORTFOLIO_VARIATION_USE_CASE,
    useClass: GetPortfolioVariationUseCase,
  },
];
