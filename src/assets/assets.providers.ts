import { Asset, AssetClass } from 'src/assets/asset.entity';

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
