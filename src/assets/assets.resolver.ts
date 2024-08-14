import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AssetsService } from 'src/assets/assets.service';
import { CreateAssetClassInput, CreateAssetInput } from 'src/graphql';

@Resolver('Assets')
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Mutation('CreateAsset')
  async createAsset(
    @Args('createAssetInput') createAssetInput: CreateAssetInput,
  ) {
    console.log(this.assetsService.createAsset(createAssetInput));

    return true;
  }

  @Mutation('CreateAssetClass')
  async createAssetClass(
    @Args('createAssetClassInput') createAssetClassInput: CreateAssetClassInput,
  ) {
    return this.assetsService.createAssetClass(createAssetClassInput);
  }
}
