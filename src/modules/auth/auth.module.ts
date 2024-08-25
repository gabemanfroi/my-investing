import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolvers } from 'src/modules/auth/auth.resolvers';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { AppConfigModule } from 'src/infra/config/app-config.module';
import { CommonAuthModule } from 'src/infra/core/common-auth/common-auth.module';

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
  providers: [AuthService, AuthResolvers],
  exports: [AuthService],
})
export class AuthModule {}
