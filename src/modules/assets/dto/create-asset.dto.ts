import { IsNumber, IsString } from 'class-validator';
import { CreateAssetInput } from 'src/graphql';
import { plainToInstance } from 'class-transformer';

export class CreateAssetDto {
  @IsString()
  symbol: string;

  @IsNumber()
  assetClassId: number;

  static fromCreateAssetInput(
    createAssetInput: CreateAssetInput,
  ): CreateAssetDto {
    return plainToInstance(CreateAssetDto, {
      symbol: createAssetInput.symbol,
      assetClassId: Number(createAssetInput.assetClassId),
    });
  }
}
