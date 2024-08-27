import { Transaction } from 'sequelize';

export const TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';

export const repositoriesProviders = [
  {
    provide: TRANSACTIONS_REPOSITORY,
    useValue: Transaction,
  },
];
