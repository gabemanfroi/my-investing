import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/domain/dto/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entity/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('OPERATIONS_REPOSITORY')
    private readonly operationsRepository: typeof Transaction,
  ) {}

  registerOperation(dto: CreateTransactionDto) {
    const createdOperation = this.operationsRepository.create(dto);
    return !!createdOperation;
  }
}
