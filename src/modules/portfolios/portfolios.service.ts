import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { IStockMarketService } from 'src/modules/stock-market/interfaces/stock-market.service';
import { Transaction } from 'src/domain/entity/transaction.entity';
import {
  CREATE_PORTFOLIO_USE_CASE,
  ICreatePortfolioUseCase,
} from 'src/domain/interfaces/use-cases/portfolios/create-portfolio.use-case.interface';

@Injectable()
export class PortfoliosService {
  constructor(
    @Inject('PORTFOLIOS_REPOSITORY')
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    @Inject('StockMarketService')
    private readonly stockMarketService: IStockMarketService,
    @Inject(CREATE_PORTFOLIO_USE_CASE)
    private readonly createPortfolioUseCase: ICreatePortfolioUseCase,
  ) {}

  async getPortfolioInvestedAmount(portfolioId: number) {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { id: portfolioId },
      include: [
        {
          model: Transaction,
          include: [{ model: Asset, include: [AssetClass] }],
        },
      ],
    });

    const mappedPortfolio = ReadPortfolioDto.fromModel(portfolio);

    return mappedPortfolio.assets.reduce(
      (acc, asset) => acc + asset.numberOfShares * asset.averagePrice,
      0,
    );
  }

  async getPortfolioVariation(portfolioId: string): Promise<{
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

    const mappedPortfolio = ReadPortfolioDto.fromModel(portfolio);

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
