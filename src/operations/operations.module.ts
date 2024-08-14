import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsResolvers } from 'src/operations/operations.resolvers';
import { operationsProviders } from 'src/operations/operations.providers';

@Module({
  providers: [OperationsService, OperationsResolvers, ...operationsProviders],
})
export class OperationsModule {}
