import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { assetsProviders } from 'src/modules/assets/assets.providers';
import { AssetsResolvers } from 'src/application/resolvers/assets.resolvers';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ListAssetsUseCase } from 'src/application/useCases/assets/list-assets.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    AssetsService,
    ...assetsProviders,
    AssetsResolvers,
    ListAssetsUseCase,
  ],
})
export class AssetsModule {}
