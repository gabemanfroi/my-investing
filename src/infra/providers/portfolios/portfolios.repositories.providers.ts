import { Portfolio } from 'src/domain/entity/portfolio.entity';

export const PORTFOLIOS_REPOSITORY = 'PORTFOLIOS_REPOSITORY';

export const repositoriesProviders = [
  {
    provide: PORTFOLIOS_REPOSITORY,
    useValue: Portfolio,
  },
];
