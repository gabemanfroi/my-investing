import { RegisterOperationInput } from 'src/graphql';
import { CreateOperationDto } from 'src/operations/dto/create-operation.dto';
import { plainToInstance } from 'class-transformer';

export class OperationsMappers {
  static fromRegisterOperationInputToOperation(
    registerOperationInput: RegisterOperationInput,
  ): CreateOperationDto {
    return plainToInstance(CreateOperationDto, {
      assetId: Number(registerOperationInput.operation.assetId),
      type: registerOperationInput.operation.type,
      price: registerOperationInput.operation.price,
      quantity: registerOperationInput.operation.quantity,
      portfolioId: Number(registerOperationInput.portfolioId),
    });
  }
}
