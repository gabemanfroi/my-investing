import { RegisterOperationInput } from 'src/graphql';
import { Operation } from 'src/operations/operation.entity';

export class OperationsMappers {
  static fromRegisterOperationInputToOperation(
    registerOperationInput: RegisterOperationInput,
  ): Partial<Operation> {
    const operation = new Operation();
    operation.assetId = Number(registerOperationInput.operation.assetId);
    operation.type = registerOperationInput.operation.type;
    operation.price = registerOperationInput.operation.price;
    operation.quantity = registerOperationInput.operation.quantity;
    operation.portfolioId = Number(registerOperationInput.portfolioId);
    return operation;
  }
}
