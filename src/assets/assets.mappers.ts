import { CreateAssetClassInput, CreateAssetInput } from 'src/graphql';
import { Asset, AssetClass } from 'src/assets/asset.entity';

export class AssetsMappers {
  static fromCreateAssetInput(
    createAssetInput: CreateAssetInput,
  ): Partial<Asset> {
    const asset = new Asset();
    asset.ticker = createAssetInput.ticker;
    asset.assetClassId = Number(createAssetInput.assetClassId);

    return asset;
  }
}

export class AssetsClassMapper {
  static fromCreateAssetClassInput(
    createAssetClassInput: CreateAssetClassInput,
  ): Partial<AssetClass> {
    const assetClass = new AssetClass();
    assetClass.name = createAssetClassInput.name;
    console.log({ assetClass });
    return assetClass;
  }
}
