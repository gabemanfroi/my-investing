import { Inject, Injectable } from '@nestjs/common';
import { Asset, AssetClass } from 'src/modules/assets/asset.entity';
import { Op } from 'sequelize';
import { CreateAssetClassDto } from 'src/modules/assets/dto/create-asset-class.dto';
import { CreateAssetDto } from 'src/modules/assets/dto/create-asset.dto';
import { Sequelize } from 'sequelize-typescript';
import { ReadAssetDto } from 'src/modules/assets/dto/read-asset.dto';
import { ReadAssetClassDto } from 'src/modules/assets/dto/read-asset-class.dto';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('ASSETS_REPOSITORY')
    private readonly assetsRepository: typeof Asset,
    @Inject('ASSETS_CLASS_REPOSITORY')
    private readonly assetsClassRepository: typeof AssetClass,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async createAsset(dto: CreateAssetDto) {
    return this.sequelize.transaction(async (transaction) => {
      const existingAsset = await this.assetsRepository.findOne({
        where: {
          symbol: {
            [Op.iLike]: dto.symbol.toLowerCase(),
          },
        },
        transaction,
      });

      if (existingAsset) {
        throw new Error('Asset already exists');
      }

      const created = await this.assetsRepository.create(dto, { transaction });

      return !!created;
    });
  }

  async createAssetClass(dto: CreateAssetClassDto) {
    return this.sequelize.transaction(async (transaction) => {
      const existingAssetClass = await this.assetsClassRepository.findOne({
        where: {
          name: {
            [Op.iLike]: dto.name.toLowerCase(),
          },
        },
        transaction,
      });

      if (existingAssetClass) {
        throw new Error('Asset class already exists');
      }

      const created = await this.assetsClassRepository.create(dto, {
        transaction,
      });

      return !!created;
    });
  }

  async listAssets(query: string) {
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
