import { Portfolio } from 'src/portfolios/portfolio.entity';

export const portfoliosProviders = [
  {
    provide: 'PORTFOLIOS_REPOSITORY',
    useValue: Portfolio,
  },
];
