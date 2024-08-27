import { repositoriesProviders } from 'src/infra/providers/transactions/transactions.repositories.providers';
import { useCasesProviders } from 'src/infra/providers/transactions/transactions.use-cases.providers';

export const transactionsProviders = [
  ...repositoriesProviders,
  ...useCasesProviders,
];
