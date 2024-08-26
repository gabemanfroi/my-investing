import { Args, Query, Resolver } from '@nestjs/graphql';
import { AssetsService } from 'src/modules/assets/assets.service';
import { ListAssetsClassesRequest, ListAssetsRequest } from 'src/graphql';
import { ReadAssetClassDto } from 'src/domain/dto/assets/read-asset-class.dto';
import { ReadAssetDto } from 'src/domain/dto/assets/read-asset.dto';
import { ListAssetsUseCase } from 'src/application/useCases/assets/list-assets.use-case';

@Resolver('Assets')
export class AssetsResolvers {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly listAssetsUseCase: ListAssetsUseCase,
  ) {}

  @Query('listAssets')
  async listAssets(
    @Args('listAssetsRequest') listAssetsRequest: ListAssetsRequest,
  ) {
    const assets = await this.listAssetsUseCase.execute(
      listAssetsRequest.query,
    );

    return ReadAssetDto.toListAssetsResponse(assets);
  }

  @Query('listAssetsClasses')
  async listAssetsClasses(
    @Args('listAssetsClassesRequest')
    listAssetsClassesRequest: ListAssetsClassesRequest,
  ) {
    const classes = await this.assetsService.listAssetsClasses(
      listAssetsClassesRequest.query,
    );

    return ReadAssetClassDto.toListAssetsClassesResponse(classes);
  }
}
