import { Inject, Injectable } from '@nestjs/common';
import { RegisterOperationInput } from 'src/graphql';
import { Operation } from 'src/operations/operation.entity';
import { OperationsMappers } from 'src/operations/operations.mappers';

@Injectable()
export class OperationsService {
  constructor(
    @Inject('OPERATIONS_REPOSITORY')
    private readonly operationsRepository: typeof Operation,
  ) {}

  registerOperation(registerOperationInput: RegisterOperationInput) {
    const operation = OperationsMappers.fromRegisterOperationInputToOperation(
      registerOperationInput,
    );

    const createdOperation = this.operationsRepository.create(operation);
    return !!createdOperation;
  }
}
