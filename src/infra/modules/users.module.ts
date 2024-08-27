import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/infra/config/app-config.module';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { UsersResolvers } from 'src/application/resolvers/users.resolvers';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { usersProviders } from 'src/infra/providers/users';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule, EventEmitterModule.forRoot()],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          secret: appConfigService.jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  exports: [...usersProviders, UsersResolvers],
  providers: [...usersProviders, UsersResolvers],
})
export class UsersModule {}
