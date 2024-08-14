import { IsNumber, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  ticker: string;

  @IsNumber()
  assetClassId: number;
}
