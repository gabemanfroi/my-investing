import { Portfolio } from 'src/domain/entity/portfolio.entity';

const PORTFOLIOS_REPOSITORY = 'PORTFOLIOS_REPOSITORY';

export const portfoliosProviders = [
  {
    provide: PORTFOLIOS_REPOSITORY,
    useValue: Portfolio,
  },
];
