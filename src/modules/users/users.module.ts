import { Module } from '@nestjs/common';
import { usersProviders } from 'src/modules/users/users.providers';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from 'src/infra/config/app-config.module';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { UsersService } from 'src/modules/users/users.service';
import { UsersResolvers } from 'src/modules/users/users.resolvers';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
  exports: [...usersProviders, UsersService, UsersResolvers],
  providers: [...usersProviders, UsersService, UsersResolvers],
})
export class UsersModule {}
