import { Inject, Injectable } from '@nestjs/common';
import { ICreatePortfolioUseCase } from 'src/domain/interfaces/use-cases/portfolios/create-portfolio.use-case.interface';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import { Transaction } from 'src/domain/entity/transaction.entity';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { PORTFOLIOS_REPOSITORY } from 'src/infra/providers/portfolios/portfolios.repositories.providers';
import { Sequelize } from 'sequelize-typescript';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/domain/entity/user.entity';

@Injectable()
export class CreatePortfolioUseCase implements ICreatePortfolioUseCase {
  constructor(
    @Inject(PORTFOLIOS_REPOSITORY)
    private readonly portfoliosRepository: typeof Portfolio,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(user: User) {
    return this.execute(user.id);
  }

  async execute(userId: number): Promise<ReadPortfolioDto> {
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
}
