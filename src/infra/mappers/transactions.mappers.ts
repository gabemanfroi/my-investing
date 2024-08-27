import { RegisterTransactionDto } from 'src/domain/dto/transactions/register-transaction.dto';
import { plainToInstance } from 'class-transformer';
import { RegisterTransactionRequest } from 'src/graphql';

export class TransactionsMappers {
  static fromRegisterOperationInputToOperation(
    registerOperationInput: RegisterTransactionRequest,
  ): RegisterTransactionDto {
    return plainToInstance(RegisterTransactionDto, {
      assetId: Number(registerOperationInput.transaction.assetId),
      type: registerOperationInput.transaction.type,
      price: registerOperationInput.transaction.price,
      quantity: registerOperationInput.transaction.quantity,
      portfolioId: Number(registerOperationInput.portfolioId),
    });
  }
}
