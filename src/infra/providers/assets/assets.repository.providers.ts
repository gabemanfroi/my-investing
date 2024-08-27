import { Asset, AssetClass } from 'src/domain/entity/asset.entity';

export const ASSETS_REPOSITORY = 'ASSETS_REPOSITORY';
export const ASSETS_CLASS_REPOSITORY = 'ASSETS_CLASS_REPOSITORY';

export const repositoryProviders = [
  {
    provide: ASSETS_REPOSITORY,
    useValue: Asset,
  },
  {
    provide: ASSETS_CLASS_REPOSITORY,
    useValue: AssetClass,
  },
];
