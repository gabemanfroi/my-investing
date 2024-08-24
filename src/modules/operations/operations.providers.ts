import { Operation } from 'src/modules/operations/operation.entity';

export const operationsProviders = [
  {
    provide: 'OPERATIONS_REPOSITORY',
    useValue: Operation,
  },
];
