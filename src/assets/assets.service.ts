import { Inject, Injectable } from '@nestjs/common';
import { Asset, AssetClass } from 'src/assets/asset.entity';
import { CreateAssetClassInput, CreateAssetInput } from 'src/graphql';
import { AssetsClassMapper } from 'src/assets/assets.mappers';
import { Op } from 'sequelize';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('ASSETS_REPOSITORY')
    private readonly assetsRepository: typeof Asset,
    @Inject('ASSETS_CLASS_REPOSITORY')
    private readonly assetsClassRepository: typeof AssetClass,
  ) {}

  async createAsset(createAssetInput: CreateAssetInput) {
    return Promise.resolve(createAssetInput);
  }

  async createAssetClass(createAssetClassInput: CreateAssetClassInput) {
    const existingAssetClass = await this.assetsClassRepository.findOne({
      where: {
        name: {
          [Op.iLike]: createAssetClassInput.name.toLowerCase(),
        },
      },
    });

    if (existingAssetClass) {
      throw new Error('Asset class already exists');
    }

    const mappedAssetClass = AssetsClassMapper.fromCreateAssetClassInput(
      createAssetClassInput,
    );

    const createdAssetClass =
      this.assetsClassRepository.create(mappedAssetClass);

    return !!createdAssetClass;
  }
}
