import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsResolvers } from 'src/operations/operations.resolvers';

@Module({
  providers: [OperationsService, OperationsResolvers],
})
export class OperationsModule {}
