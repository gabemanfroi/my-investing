import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsResolvers } from 'src/modules/transactions/operations.resolvers';
import { operationsProviders } from 'src/modules/transactions/operations.providers';

@Module({
  providers: [OperationsService, OperationsResolvers, ...operationsProviders],
})
export class OperationsModule {}
