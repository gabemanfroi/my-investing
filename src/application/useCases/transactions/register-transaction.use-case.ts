import { Inject, Injectable } from '@nestjs/common';
import { RegisterTransactionDto } from 'src/domain/dto/transactions/register-transaction.dto';
import { Transaction } from 'src/domain/entity/transaction.entity';
import { IRegisterTransactionUseCase } from 'src/domain/interfaces/use-cases/transactions/register-transaction.use-case.interface';
import { TRANSACTIONS_REPOSITORY } from 'src/infra/providers/transactions/transactions.repositories.providers';

@Injectable()
export class RegisterTransactionUseCase implements IRegisterTransactionUseCase {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: typeof Transaction,
  ) {}

  async execute(dto: RegisterTransactionDto): Promise<boolean> {
    const createdOperation = await this.transactionsRepository.create(dto);
    return !!createdOperation;
  }
}
