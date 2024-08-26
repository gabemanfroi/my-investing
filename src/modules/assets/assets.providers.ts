import { Asset, AssetClass } from 'src/domain/entity/asset.entity';

export const assetsProviders = [
  {
    provide: 'ASSETS_REPOSITORY',
    useValue: Asset,
  },
  {
    provide: 'ASSETS_CLASS_REPOSITORY',
    useValue: AssetClass,
  },
];
