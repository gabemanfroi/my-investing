import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionsMappers } from 'src/infra/mappers/transactions.mappers';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { RegisterTransactionRequest } from 'src/graphql';
import { MUTATIONS } from 'src/infra/core/constants/mutations';
import { RegisterTransactionUseCase } from 'src/application/useCases/transactions/register-transaction.use-case';
import { REGISTER_TRANSACTION_USE_CASE } from 'src/domain/interfaces/use-cases/transactions/register-transaction.use-case.interface';

@Resolver('Transactions')
export class TransactionsResolvers {
  constructor(
    @Inject(REGISTER_TRANSACTION_USE_CASE)
    private readonly registerTransactionUseCase: RegisterTransactionUseCase,
  ) {}

  @Mutation(MUTATIONS.REGISTER_TRANSACTION)
  @UseGuards(GqlAuthGuard)
  async registerTransaction(
    @Args('registerTransactionInput')
    registerOperationInput: RegisterTransactionRequest,
  ) {
    const dto = TransactionsMappers.fromRegisterOperationInputToOperation(
      registerOperationInput,
    );

    return this.registerTransactionUseCase.execute(dto);
  }
}
