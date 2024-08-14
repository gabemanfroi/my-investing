import { IsNumber, IsString } from 'class-validator';
import { AssetClass } from 'src/assets/asset.entity';
import { ListAssetsClassesResponse } from 'src/graphql';

export class ReadAssetClassDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  static fromModel(assetClass: AssetClass): ReadAssetClassDto {
    return {
      id: assetClass.id,
      name: assetClass.name,
    };
  }

  static manyFromModel(classes: AssetClass[]): ReadAssetClassDto[] {
    return classes.map((assetClass) => ReadAssetClassDto.fromModel(assetClass));
  }

  static toListAssetsClassesResponse(
    classes: ReadAssetClassDto[],
  ): ListAssetsClassesResponse {
    return {
      assetClasses: classes.map((c) => {
        return {
          id: String(c.id),
          name: c.name,
        };
      }),
    };
  }
}
