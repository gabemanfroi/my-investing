import { Transaction } from 'sequelize';

export const TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';

export const transactionsProviders = [
  {
    provide: TRANSACTIONS_REPOSITORY,
    useValue: Transaction,
  },
];
