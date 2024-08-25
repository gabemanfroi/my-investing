import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolvers } from 'src/modules/auth/auth.resolvers';
import { UsersModule } from 'src/modules/users/users.module';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { AppConfigModule } from 'src/infra/config/app-config.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AppConfigModule,
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
  providers: [AuthService, JwtStrategy, AuthResolvers, GqlAuthGuard],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
