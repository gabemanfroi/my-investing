import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { assetsProviders } from 'src/modules/assets/assets.providers';
import { AssetsResolvers } from 'src/modules/assets/assets.resolvers';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AssetsService, ...assetsProviders, AssetsResolvers],
})
export class AssetsModule {}
