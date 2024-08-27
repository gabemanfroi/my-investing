import { ReadAssetDto } from 'src/domain/dto/assets/read-asset.dto';

export const LIST_ASSETS_USE_CASE = 'LIST_ASSETS_USE_CASE';

export interface IListAssetsUseCase {
  execute(query: string): Promise<ReadAssetDto[]>;
}
