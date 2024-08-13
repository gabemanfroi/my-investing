import { Inject, Injectable } from '@nestjs/common';
import { Asset } from 'src/assets/asset.entity';
import { CreateAssetInput } from 'src/graphql';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('ASSETS_REPOSITORY')
    private readonly assetsRepository: typeof Asset,
  ) {}

  createAsset(createAssetInput: CreateAssetInput) {
    return Promise.resolve(createAssetInput);
  }
}
