import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AssetsService } from 'src/assets/assets.service';
import { CreateAssetClassInput, CreateAssetInput } from 'src/graphql';
import { AssetsClassMapper, AssetsMappers } from 'src/assets/assets.mappers';

@Resolver('Assets')
export class AssetsResolvers {
  constructor(private readonly assetsService: AssetsService) {}

  @Mutation('createAsset')
  async createAsset(
    @Args('createAssetInput') createAssetInput: CreateAssetInput,
  ) {
    const dto = AssetsMappers.fromCreateAssetInput(createAssetInput);
    return this.assetsService.createAsset(dto);
  }

  @Mutation('createAssetClass')
  async createAssetClass(
    @Args('createAssetClassInput') createAssetClassInput: CreateAssetClassInput,
  ) {
    const dto = AssetsClassMapper.fromCreateAssetClassInputToDto(
      createAssetClassInput,
    );

    return this.assetsService.createAssetClass(dto);
  }
}
