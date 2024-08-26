import { IsDecimal, IsInstance, IsNumber, IsString } from 'class-validator';
import { ReadAssetClassDto } from 'src/domain/dto/assets/read-asset-class.dto';
import { Asset } from 'src/domain/entity/asset.entity';
import { ListAssetsResponse } from 'src/graphql';
import { plainToInstance } from 'class-transformer';
import { ReadIndustryDto } from 'src/domain/dto/assets/read-industry.dto';
import { ReadSectorDto } from 'src/domain/dto/assets/read-sector.dto';
import { ReadExchangeDto } from 'src/domain/dto/assets/read-exchange.dto';
import { ReadCurrencyDto } from 'src/domain/dto/currencies/read-currency.dto';

export class ReadPortfolioAssetDto {
  @IsNumber()
  id: number;

  @IsString()
  symbol: string;

  @IsString()
  className: string;

  @IsDecimal()
  numberOfShares: number;

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
  symbol: string;

  @IsInstance(ReadAssetClassDto)
  class: ReadAssetClassDto;

  @IsInstance(ReadIndustryDto)
  industry: ReadIndustryDto;

  @IsInstance(ReadSectorDto)
  sector: ReadSectorDto;

  @IsInstance(ReadPortfolioAssetDto)
  exchange: ReadExchangeDto;

  @IsInstance(ReadCurrencyDto)
  currency: ReadCurrencyDto;

  static fromModel(asset: Asset): ReadAssetDto {
    return plainToInstance(ReadAssetDto, {
      id: Number(asset.id),
      symbol: asset.symbol,
      class: ReadAssetClassDto.fromModel(asset.class),
      industry: ReadIndustryDto.fromModel(asset.industry),
      sector: ReadSectorDto.fromModel(asset.sector),
      exchange: ReadExchangeDto.fromModel(asset.exchange),
      currency: ReadCurrencyDto.fromModel(asset.currency),
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
          symbol: a.symbol,
          class: {
            id: String(a.class.id),
            name: a.class.name,
          },
          exchange: {
            id: String(a.exchange.id),
            name: a.exchange.name,
          },
          industry: {
            id: String(a.industry.id),
            name: a.industry.name,
          },
          sector: {
            id: String(a.sector.id),
            name: a.sector.name,
          },
          currency: {
            id: String(a.currency.id),
            name: a.currency.name,
            symbol: a.currency.symbol,
          },
        };
      }),
    };
  }
}
