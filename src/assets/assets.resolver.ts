import { Args, Query, Resolver } from '@nestjs/graphql';
import { AssetsService } from 'src/assets/assets.service';

@Resolver('Assets')
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query('getUserAssets')
  async getUserAssets(@Args('id') id: number) {
    return this.assetsService.getUserAssets(id);
  }
}
