import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { AppConfigService } from 'src/infra/config/app-config.service';

@Global() // This decorator makes the module global
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // This makes the NestJS ConfigModule global
    }),
  ],
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService], // Export the service so it can be used in other modules
})
export class AppConfigModule {}
