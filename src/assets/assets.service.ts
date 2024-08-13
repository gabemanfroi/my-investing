import { Inject, Injectable } from '@nestjs/common';
import { Asset } from 'src/assets/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('ASSETS_REPOSITORY')
    private readonly assetsRepository: typeof Asset,
  ) {}

  getUserAssets(userId: number) {
    return this.assetsRepository.findAll();
  }
}
