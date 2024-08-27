import { Args, Query, Resolver } from '@nestjs/graphql';
import { ListAssetsRequest } from 'src/graphql';
import { ReadAssetDto } from 'src/domain/dto/assets/read-asset.dto';
import { Inject } from '@nestjs/common';
import {
  IListAssetsUseCase,
  LIST_ASSETS_USE_CASE,
} from 'src/domain/interfaces/use-cases/assets/list-assets.use-case.interface';
import { QUERIES } from 'src/infra/core/constants/queries';

@Resolver('Assets')
export class AssetsResolvers {
  constructor(
    @Inject(LIST_ASSETS_USE_CASE)
    private readonly listAssetsUseCase: IListAssetsUseCase,
  ) {}

  @Query(QUERIES.LIST_ASSETS)
  async listAssets(
    @Args('listAssetsRequest') listAssetsRequest: ListAssetsRequest,
  ) {
    const assets = await this.listAssetsUseCase.execute(
      listAssetsRequest.query,
    );

    return ReadAssetDto.toListAssetsResponse(assets);
  }
}
