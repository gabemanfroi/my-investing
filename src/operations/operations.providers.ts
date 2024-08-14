import { Operation } from 'src/operations/operation.entity';

export const operationsProviders = [
  {
    provide: 'OPERATIONS_REPOSITORY',
    useValue: Operation,
  },
];
