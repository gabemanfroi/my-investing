import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OperationsService } from 'src/operations/operations.service';
import { RegisterOperationInput } from 'src/graphql';
import { OperationsMappers } from 'src/operations/operations.mappers';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';

@Resolver('Operations')
export class OperationsResolvers {
  constructor(private readonly operationsService: OperationsService) {}

  @Mutation('RegisterOperation')
  @UseGuards(GqlAuthGuard)
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
