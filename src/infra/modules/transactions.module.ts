import { Module } from '@nestjs/common';
import { TransactionsResolvers } from 'src/application/resolvers/transactions.resolvers';
import { transactionsProviders } from 'src/infra/providers/transactions';

@Module({
  providers: [TransactionsResolvers, ...transactionsProviders],
})
export class TransactionsModule {}
