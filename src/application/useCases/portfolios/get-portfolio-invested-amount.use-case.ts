import { Inject, Injectable } from '@nestjs/common';
import { IGetPortfolioInvestedAmountUseCase } from 'src/domain/interfaces/use-cases/portfolios/get-portfolio-invested-amount.use-case.interface';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import { Transaction } from 'src/domain/entity/transaction.entity';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { PORTFOLIOS_REPOSITORY } from 'src/infra/providers/portfolios/portfolios.repositories.providers';
import { ReadPortfolioDto } from 'src/domain/dto/portfolios/read-portfolio.dto';

@Injectable()
export class GetPortfolioInvestedAmountUseCase
  implements IGetPortfolioInvestedAmountUseCase
{
  constructor(
    @Inject(PORTFOLIOS_REPOSITORY)
    private readonly portfoliosRepository: typeof Portfolio,
  ) {}

  async execute(portfolioId: number): Promise<number> {
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
}
