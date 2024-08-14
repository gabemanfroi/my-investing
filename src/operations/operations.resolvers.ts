import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OperationsService } from 'src/operations/operations.service';
import { RegisterOperationInput } from 'src/graphql';
import { OperationsMappers } from 'src/operations/operations.mappers';

@Resolver('Operations')
export class OperationsResolvers {
  constructor(private readonly operationsService: OperationsService) {}

  @Mutation('RegisterOperation')
  async registerOperation(
    @Args('registerOperationInput')
    registerOperationInput: RegisterOperationInput,
  ) {
    const dto = OperationsMappers.fromRegisterOperationInputToOperation(
      registerOperationInput,
    );

    return this.operationsService.registerOperation(dto);
  }
}
