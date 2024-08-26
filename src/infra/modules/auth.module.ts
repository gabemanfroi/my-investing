import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolvers } from 'src/application/resolvers/auth.resolvers';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { AppConfigModule } from 'src/infra/config/app-config.module';
import { CommonAuthModule } from 'src/infra/core/common-auth/common-auth.module';
import { authProviders } from 'src/infra/providers/auth.providers';

@Module({
  imports: [
    AppConfigModule,
    CommonAuthModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          secret: appConfigService.jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [AuthResolvers, ...authProviders],
  exports: [],
})
export class AuthModule {}
