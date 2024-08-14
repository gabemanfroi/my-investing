import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OperationsService } from 'src/operations/operations.service';
import { RegisterOperationInput } from 'src/graphql';

@Resolver('Operations')
export class OperationsResolvers {
  constructor(private readonly operationsService: OperationsService) {}

  @Mutation('RegisterOperation')
  async registerOperation(
    @Args('registerOperationInput')
    registerOperationInput: RegisterOperationInput,
  ) {
    try {
      const registeredOperation =
        await this.operationsService.registerOperation(registerOperationInput);

      return !!registeredOperation;
    } catch {
      return false;
    }
  }
}
