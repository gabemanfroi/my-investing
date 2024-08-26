import { CreateTransactionDto } from 'src/domain/dto/transactions/create-transaction.dto';
import { plainToInstance } from 'class-transformer';
import { RegisterTransactionRequest } from 'src/graphql';

export class TransactionsMappers {
  static fromRegisterOperationInputToOperation(
    registerOperationInput: RegisterTransactionRequest,
  ): CreateTransactionDto {
    return plainToInstance(CreateTransactionDto, {
      assetId: Number(registerOperationInput.transaction.assetId),
      type: registerOperationInput.transaction.type,
      price: registerOperationInput.transaction.price,
      quantity: registerOperationInput.transaction.quantity,
      portfolioId: Number(registerOperationInput.portfolioId),
    });
  }
}
