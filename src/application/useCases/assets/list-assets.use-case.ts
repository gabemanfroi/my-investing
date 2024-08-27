import { Inject, Injectable } from '@nestjs/common';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { ReadAssetDto } from 'src/domain/dto/assets/read-asset.dto';
import { Op } from 'sequelize';
import { ASSETS_REPOSITORY } from 'src/infra/providers/assets.providers';

export interface IListAssetsUseCase {
  execute(query: string): Promise<ReadAssetDto[]>;
}

@Injectable()
export class ListAssetsUseCase implements IListAssetsUseCase {
  constructor(
    @Inject(ASSETS_REPOSITORY)
    private readonly assetsRepository: typeof Asset,
  ) {}

  async execute(query: string) {
    const assets = await this.assetsRepository.findAll({
      where: {
        symbol: {
          [Op.iLike]: `%${query.toLowerCase()}%`,
        },
      },
      include: [AssetClass],
    });

    return ReadAssetDto.manyFromModel(assets);
  }
}
