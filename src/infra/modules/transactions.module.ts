import { Module } from '@nestjs/common';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { TransactionsResolvers } from 'src/application/resolvers/transactions.resolvers';
import { transactionsProviders } from 'src/infra/providers/transactions.providers';

@Module({
  providers: [
    TransactionsService,
    TransactionsResolvers,
    ...transactionsProviders,
  ],
})
export class TransactionsModule {}
