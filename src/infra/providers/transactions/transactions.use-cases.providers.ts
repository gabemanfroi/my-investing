import { REGISTER_TRANSACTION_USE_CASE } from 'src/domain/interfaces/use-cases/transactions/register-transaction.use-case.interface';
import { RegisterTransactionUseCase } from 'src/application/useCases/transactions/register-transaction.use-case';

export const useCasesProviders = [
  {
    provide: REGISTER_TRANSACTION_USE_CASE,
    useClass: RegisterTransactionUseCase,
  },
];
