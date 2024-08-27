import { IsEnum, IsNumber } from 'class-validator';
import { TransactionType } from 'src/domain/entity/transaction.entity';

export class RegisterTransactionDto {
  @IsNumber()
  portfolioId: number;

  @IsNumber()
  assetId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
