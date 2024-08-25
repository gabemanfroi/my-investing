import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Operation } from 'src/modules/operations/operation.entity';
import { ReadPortfolioDto } from 'src/modules/portfolios/dto/read-portfolio.dto';
import { Portfolio } from 'src/modules/portfolios/portfolio.entity';
import { Asset, AssetClass } from 'src/modules/assets/asset.entity';
import { StockMarketService } from 'src/modules/stock-market/interfaces/stock-market.service';

@Injectable()
export class PortfoliosService {
  constructor(
    @Inject('PORTFOLIOS_REPOSITORY')
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    @Inject('StockMarketService')
    private readonly stockMarketService: StockMarketService,
  ) {}

  async getUserPortfolio(userId: number): Promise<ReadPortfolioDto> {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { userId },
      include: [
        {
          model: Operation,
          include: [{ model: Asset, include: [AssetClass] }],
        },
      ],
    });

    const mappedPortfolio = ReadPortfolioDto.fromModel(portfolio);

    const assetsWithCurrentPrices = await Promise.all(
      mappedPortfolio.assets.map(async (asset) => {
        const currentPrice = await this.stockMarketService.getStockPrice(
          asset.ticker,
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

  async createPortfolio(userId: number) {
    return this.sequelize.transaction(async (transaction) => {
      const existingPortfolio = await this.portfoliosRepository.findOne({
        where: { userId },
        transaction,
      });

      if (existingPortfolio) {
        throw new Error('user already has a portfolio');
      }

      const createdPortfolio = await this.portfoliosRepository.create(
        { userId },
        {
          transaction,
          include: [
            {
              model: Operation,
              include: [{ model: Asset, include: [AssetClass] }],
            },
          ],
        },
      );

      return ReadPortfolioDto.fromModel(createdPortfolio);
    });
  }

  async getPortfolioInvestedAmount(portfolioId: number) {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { id: portfolioId },
      include: [
        {
          model: Operation,
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
}
