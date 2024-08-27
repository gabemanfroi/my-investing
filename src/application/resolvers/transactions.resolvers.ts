import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { TransactionsMappers } from 'src/modules/transactions/transactions.mappers';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { RegisterTransactionRequest } from 'src/graphql';
import { MUTATIONS } from 'src/infra/core/constants/mutations';

@Resolver('Transactions')
export class TransactionsResolvers {
  constructor(private readonly operationsService: TransactionsService) {}

  @Mutation(MUTATIONS.REGISTER_TRANSACTION)
  @UseGuards(GqlAuthGuard)
  async registerTransaction(
    @Args('registerTransactionInput')
    registerOperationInput: RegisterTransactionRequest,
  ) {
    const dto = TransactionsMappers.fromRegisterOperationInputToOperation(
      registerOperationInput,
    );

    return this.operationsService.registerOperation(dto);
  }
}
