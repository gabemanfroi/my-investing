import { RegisterTransactionDto } from 'src/domain/dto/transactions/register-transaction.dto';

export const REGISTER_TRANSACTION_USE_CASE = 'REGISTER_TRANSACTION_USE_CASE';

export interface IRegisterTransactionUseCase {
  execute(registerTransactionDto: RegisterTransactionDto): Promise<boolean>;
}
