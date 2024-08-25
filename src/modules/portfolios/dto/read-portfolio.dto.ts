import { IsArray, IsNumber } from 'class-validator';
import { GetUserPortfolioResponse } from 'src/graphql';
import { ReadPortfolioAssetDto } from 'src/modules/assets/dto/read-asset.dto';
import { Portfolio } from 'src/modules/portfolios/portfolio.entity';

export class ReadPortfolioDto {
  @IsNumber()
  id: number;

  @IsArray()
  assets: ReadPortfolioAssetDto[];

  static fromModel(portfolio: Portfolio): ReadPortfolioDto {
    const dto = new ReadPortfolioDto();
    dto.id = portfolio.id;

    const assetMap: {
      [key: string]: {
        id: number;
        ticker: string;
        className: string;
        numberOfShares: number;
        cumulativeCost: number; // Used to calculate average price
      };
    } = {};

    (portfolio.operations ?? []).forEach((operation) => {
      const assetKey = `${operation.asset.id}`; // Assuming asset ID uniquely identifies an asset

      if (!assetMap[assetKey]) {
        assetMap[assetKey] = {
          id: operation.asset.id,
          ticker: operation.asset.ticker,
          className: operation.asset.class.name,
          numberOfShares: 0,
          cumulativeCost: 0,
        };
      }

      const assetData = assetMap[assetKey];

      if (operation.type === 'BUY') {
        assetData.numberOfShares += operation.quantity;
        assetData.cumulativeCost += operation.quantity * operation.price;
      } else if (operation.type === 'SELL') {
        assetData.numberOfShares -= operation.quantity;
        assetData.cumulativeCost -= operation.quantity * operation.price;
      }
    });

    // Build the assets array
    dto.assets = Object.values(assetMap)
      // Filter out assets with zero or negative quantity
      .filter((asset) => asset.numberOfShares > 0)
      .map((asset) => {
        const assetDto = new ReadPortfolioAssetDto();
        assetDto.id = asset.id;
        assetDto.ticker = asset.ticker;
        assetDto.className = asset.className;
        assetDto.numberOfShares = asset.numberOfShares;
        assetDto.averagePrice = parseFloat(
          (asset.cumulativeCost / asset.numberOfShares).toFixed(2),
        );
        assetDto.cumulativeTotal = asset.cumulativeCost;
        return assetDto;
      });

    return dto;
  }

  static toGetUserPortfolioResponse(
    dto: ReadPortfolioDto,
  ): GetUserPortfolioResponse {
    return {
      portfolio: {
        assets: dto.assets.map((asset) => ({
          ...asset,
          id: `${asset.id}`,
        })),
        portfolioId: `${dto.id}`,
      },
    };
  }
}
