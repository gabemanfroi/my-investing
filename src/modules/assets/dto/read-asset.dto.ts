import { IsDecimal, IsInstance, IsNumber, IsString } from 'class-validator';
import { ReadAssetClassDto } from 'src/modules/assets/dto/read-asset-class.dto';
import { Asset } from 'src/modules/assets/asset.entity';
import { ListAssetsResponse } from 'src/graphql';
import { plainToInstance } from 'class-transformer';

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

  @IsDecimal()
  currentPrice: number;
}

export class ReadAssetDto {
  @IsNumber()
  id: number;

  @IsString()
  ticker: string;

  @IsInstance(ReadAssetClassDto)
  class: ReadAssetClassDto;

  static fromModel(asset: Asset): ReadAssetDto {
    return plainToInstance(ReadAssetDto, {
      id: Number(asset.id),
      ticker: asset.ticker,
      class: ReadAssetClassDto.fromModel(asset.class),
    });
  }

  static manyFromModel(assets: Asset[]): ReadAssetDto[] {
    return assets.map((asset) => ReadAssetDto.fromModel(asset));
  }

  static toListAssetsResponse(assets: ReadAssetDto[]): ListAssetsResponse {
    return {
      assets: assets.map((a) => {
        return {
          id: String(a.id),
          ticker: a.ticker,
          class: {
            id: String(a.class.id),
            name: a.class.name,
          },
        };
      }),
    };
  }
}
