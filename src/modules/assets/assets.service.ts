import { Inject, Injectable } from '@nestjs/common';
import { Asset, AssetClass } from 'src/domain/entity/asset.entity';
import { Op } from 'sequelize';
import { ReadAssetClassDto } from 'src/domain/dto/assets/read-asset-class.dto';
import {
  ASSETS_CLASS_REPOSITORY,
  ASSETS_REPOSITORY,
} from 'src/infra/providers/assets.providers';

@Injectable()
export class AssetsService {
  constructor(
    @Inject(ASSETS_REPOSITORY)
    private readonly assetsRepository: typeof Asset,
    @Inject(ASSETS_CLASS_REPOSITORY)
    private readonly assetsClassRepository: typeof AssetClass,
  ) {}

  async listAssetsClasses(query: string) {
    const classes = await this.assetsClassRepository.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query.toLowerCase()}%`,
        },
      },
    });

    return ReadAssetClassDto.manyFromModel(classes);
  }
}
