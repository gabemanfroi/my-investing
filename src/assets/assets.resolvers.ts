import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetsService } from 'src/assets/assets.service';
import {
  CreateAssetClassInput,
  CreateAssetInput,
  ListAssetsClassesRequest,
  ListAssetsRequest,
} from 'src/graphql';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';
import { CreateAssetClassDto } from 'src/assets/dto/create-asset-class.dto';
import { ReadAssetClassDto } from 'src/assets/dto/read-asset-class.dto';
import { ReadAssetDto } from 'src/assets/dto/read-asset.dto';

@Resolver('Assets')
export class AssetsResolvers {
  constructor(private readonly assetsService: AssetsService) {}

  @Mutation('createAsset')
  async createAsset(
    @Args('createAssetInput') createAssetInput: CreateAssetInput,
  ) {
    const dto = CreateAssetDto.fromCreateAssetInput(createAssetInput);
    return this.assetsService.createAsset(dto);
  }

  @Mutation('createAssetClass')
  async createAssetClass(
    @Args('createAssetClassInput') createAssetClassInput: CreateAssetClassInput,
  ) {
    const dto = CreateAssetClassDto.fromCreateAssetClassInputToDto(
      createAssetClassInput,
    );

    return this.assetsService.createAssetClass(dto);
  }

  @Query('listAssets')
  async listAssets(
    @Args('listAssetsRequest') listAssetsRequest: ListAssetsRequest,
  ) {
    const assets = await this.assetsService.listAssets(listAssetsRequest.query);

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
