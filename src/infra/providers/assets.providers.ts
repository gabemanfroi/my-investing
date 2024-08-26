import { Asset, AssetClass } from 'src/domain/entity/asset.entity';

const AssetsRepositoryToken = 'ASSETS_REPOSITORY';
const AssetsClassRepositoryToken = 'ASSETS_CLASS_REPOSITORY';

export const assetsProviders = [
  {
    provide: AssetsRepositoryToken,
    useValue: Asset,
  },
  {
    provide: AssetsClassRepositoryToken,
    useValue: AssetClass,
  },
];
