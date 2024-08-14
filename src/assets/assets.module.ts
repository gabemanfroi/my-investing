import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { assetsProviders } from 'src/assets/assets.providers';
import { AssetsResolver } from 'src/assets/assets.resolver';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AssetsService, ...assetsProviders, AssetsResolver],
})
export class AssetsModule {}
