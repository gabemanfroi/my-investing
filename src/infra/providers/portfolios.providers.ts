import { Portfolio } from 'src/domain/entity/portfolio.entity';

const PortfoliosRepositoryToken = 'PORTFOLIOS_REPOSITORY';

export const portfoliosProviders = [
  {
    provide: PortfoliosRepositoryToken,
    useValue: Portfolio,
  },
];
