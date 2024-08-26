import { IsEnum, IsNumber } from 'class-validator';
import { OperationType } from 'src/modules/transactions/operation.entity';

export class CreateOperationDto {
  @IsNumber()
  portfolioId: number;

  @IsNumber()
  assetId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsEnum(OperationType)
  type: OperationType;
}
