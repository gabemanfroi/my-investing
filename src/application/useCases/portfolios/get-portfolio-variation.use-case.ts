import { Inject, Injectable } from '@nestjs/common';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import { Transaction } from 'src/domain/entity/transaction.entity';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { PORTFOLIOS_REPOSITORY } from 'src/infra/providers/portfolios/portfolios.repositories.providers';
import {
  IStockMarketService,
  STOCK_MARKET_SERVICE,
} from 'src/modules/stock-market/interfaces/stock-market.service';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';
import { IGetPortfolioVariationUseCase } from 'src/domain/interfaces/use-cases/portfolios/get-portfolio-variation.use-case.interface';

@Injectable()
export class GetPortfolioVariationUseCase
  implements IGetPortfolioVariationUseCase
{
  constructor(
    @Inject(PORTFOLIOS_REPOSITORY)
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject(STOCK_MARKET_SERVICE)
    private readonly stockMarketService: IStockMarketService,
  ) {}

  async execute(portfolioId: string): Promise<{
    valueVariation: number;
    percentageVariation: number;
  }> {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { id: portfolioId },
      include: [
        {
          model: Transaction,
          include: [{ model: Asset, include: [AssetClass] }],
        },
      ],
    });

    const mappedPortfolio = ReadPortfolioDto.fromModel(portfolio); // Assuming you have a method to map the entity to DTO

    const totalInvestedAmount = mappedPortfolio.assets.reduce(
      (acc, asset) => acc + asset.numberOfShares * asset.averagePrice,
      0,
    );

    const currentPortfolioValue = await Promise.all(
      mappedPortfolio.assets.map(async (asset) => {
        const currentPrice = await this.stockMarketService.getStockPrice(
          asset.symbol,
        );
        return currentPrice * asset.numberOfShares;
      }),
    );

    const totalPortfolioValue = currentPortfolioValue.reduce(
      (acc, value) => acc + value,
      0,
    );

    return {
      valueVariation: parseFloat(
        (totalPortfolioValue - totalInvestedAmount).toFixed(2),
      ),
      percentageVariation: Number(
        (
          ((totalPortfolioValue - totalInvestedAmount) / totalInvestedAmount) *
          100
        ).toFixed(2),
      ),
    };
  }
}
