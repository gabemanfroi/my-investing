import { Module } from '@nestjs/common';
import { AssetsResolvers } from 'src/application/resolvers/assets.resolvers';
import { DatabaseModule } from 'src/infra/database/database.module';
import { assetsProviders } from 'src/infra/providers/assets';

@Module({
  imports: [DatabaseModule],
  providers: [...assetsProviders, AssetsResolvers],
})
export class AssetsModule {}
