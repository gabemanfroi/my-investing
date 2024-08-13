import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { assetsProviders } from 'src/assets/assets.providers';
import { AssetsResolver } from 'src/assets/assets.resolver';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, ...assetsProviders, AssetsResolver],
})
export class AssetsModule {}
