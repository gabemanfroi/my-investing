import { Inject, Injectable } from '@nestjs/common';
import { Portfolio } from 'src/portfolios/portfolio.entity';
import { Asset, AssetClass } from 'src/assets/asset.entity';
import { Sequelize } from 'sequelize-typescript';
import { Operation } from 'src/operations/operation.entity';
import { ReadPortfolioDto } from 'src/portfolios/dto/read-portfolio.dto';
import { PortfoliosMappers } from 'src/portfolios/portfolios.mappers';

@Injectable()
export class PortfoliosService {
  constructor(
    @Inject('PORTFOLIOS_REPOSITORY')
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
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

    return PortfoliosMappers.fromModelToReadPortfolioDto(portfolio);
  }

  async createPortfolio(userId: number) {
    return this.sequelize.transaction(async (transaction) => {
      const existingPortfolio = await this.portfoliosRepository.findOne({
        where: { userId },
        include: [Asset],
        transaction,
      });

      if (existingPortfolio) {
        return existingPortfolio;
      }

      const createdPortfolio = await this.portfoliosRepository.create(
        { userId },
        { transaction },
      );

      return this.portfoliosRepository.findOne({
        where: { id: createdPortfolio.id },
        include: [Asset],
        transaction,
      });
    });
  }
}
