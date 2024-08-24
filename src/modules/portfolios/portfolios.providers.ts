import { Portfolio } from 'src/modules/portfolios/portfolio.entity';

export const portfoliosProviders = [
  {
    provide: 'PORTFOLIOS_REPOSITORY',
    useValue: Portfolio,
  },
];
