import { IsDecimal, IsNumber, IsString } from 'class-validator';

export class ReadPortfolioAssetDto {
  @IsNumber()
  id: number;

  @IsString()
  ticker: string;

  @IsString()
  className: string;

  @IsDecimal()
  totalAmount: number;

  @IsDecimal()
  averagePrice: number;

  @IsDecimal()
  cumulativeTotal: number;
}
