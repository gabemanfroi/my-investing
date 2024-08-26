import { Operation } from 'src/modules/transactions/operation.entity';

export const operationsProviders = [
  {
    provide: 'OPERATIONS_REPOSITORY',
    useValue: Operation,
  },
];
