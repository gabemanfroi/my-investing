import { IsArray, IsNumber } from 'class-validator';
import { ReadPortfolioAssetDto } from 'src/assets/dto/read-asset.dto';

export class ReadPortfolioDto {
  @IsNumber()
  id: number;

  @IsArray()
  assets: ReadPortfolioAssetDto[];
}
