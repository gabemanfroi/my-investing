import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { assetsProviders } from 'src/assets/assets.providers';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, ...assetsProviders],
})
export class AssetsModule {}
