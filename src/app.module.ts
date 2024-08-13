import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [AssetsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
