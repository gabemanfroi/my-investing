import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/domain/dto/transactions/create-transaction.dto';
import { Transaction } from 'src/domain/entity/transaction.entity';
import { TRANSACTIONS_REPOSITORY } from 'src/infra/providers/transactions.providers';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: typeof Transaction,
  ) {}

  registerOperation(dto: CreateTransactionDto) {
    const createdOperation = this.transactionsRepository.create(dto);
    return !!createdOperation;
  }
}
