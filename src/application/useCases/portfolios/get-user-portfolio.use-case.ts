import { Inject, Injectable } from '@nestjs/common';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';
import { IGetUserPortfolioUseCase } from 'src/domain/interfaces/use-cases/portfolios/get-user-portfolio.use-case.interface';
import { Transaction } from 'src/domain/entity/transaction.entity';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import {
  IStockMarketService,
  STOCK_MARKET_SERVICE,
} from 'src/infra/stock-market/interfaces/stock-market.service';
import { PORTFOLIOS_REPOSITORY } from 'src/infra/providers/portfolios/portfolios.repositories.providers';

@Injectable()
export class GetUserPortfolioUseCase implements IGetUserPortfolioUseCase {
  constructor(
    @Inject(PORTFOLIOS_REPOSITORY)
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject(STOCK_MARKET_SERVICE)
    private readonly stockMarketService: IStockMarketService,
  ) {}

  async execute(userId: number): Promise<ReadPortfolioDto> {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { userId },
      include: [
        {
          model: Transaction,
          include: [{ model: Asset, include: [AssetClass] }],
        },
      ],
    });

    const mappedPortfolio = ReadPortfolioDto.fromModel(portfolio);

    const assetsWithCurrentPrices = await Promise.all(
      mappedPortfolio.assets.map(async (asset) => {
        const currentPrice = await this.stockMarketService.getStockPrice(
          asset.symbol,
        );
        return {
          ...asset,
          currentPrice,
        };
      }),
    );
    return {
      ...mappedPortfolio,
      assets: assetsWithCurrentPrices,
    };
  }
}
