import { Inject, Injectable } from '@nestjs/common';
import { Asset, AssetClass } from 'src/assets/asset.entity';
import { Op } from 'sequelize';
import { CreateAssetClassDto } from 'src/assets/dto/create-asset-class.dto';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';
import { Sequelize } from 'sequelize-typescript';

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
          ticker: {
            [Op.iLike]: dto.ticker.toLowerCase(),
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
}
