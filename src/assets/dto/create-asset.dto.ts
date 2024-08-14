import { IsNumber, IsString } from 'class-validator';
import { CreateAssetInput } from 'src/graphql';
import { plainToInstance } from 'class-transformer';

export class CreateAssetDto {
  @IsString()
  ticker: string;

  @IsNumber()
  assetClassId: number;

  static fromCreateAssetInput(
    createAssetInput: CreateAssetInput,
  ): CreateAssetDto {
    return plainToInstance(CreateAssetDto, {
      ticker: createAssetInput.ticker,
      assetClassId: Number(createAssetInput.assetClassId),
    });
  }
}
