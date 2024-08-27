import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { IStockMarketService } from 'src/modules/stock-market/interfaces/stock-market.service';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/domain/entity/user.entity';
import { Transaction } from 'src/domain/entity/transaction.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @Inject('PORTFOLIOS_REPOSITORY')
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    @Inject('StockMarketService')
    private readonly stockMarketService: IStockMarketService,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(user: User) {
    return this.createPortfolio(user.id);
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
              model: Transaction,
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
