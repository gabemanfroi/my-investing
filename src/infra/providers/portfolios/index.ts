import { repositoriesProviders } from 'src/infra/providers/portfolios/portfolios.repositories.providers';
import { useCasesProviders } from 'src/infra/providers/portfolios/portfolios.use-cases.providers';

export const portfoliosProviders = [
  ...repositoriesProviders,
  ...useCasesProviders,
];
