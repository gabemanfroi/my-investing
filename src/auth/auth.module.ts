import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolvers } from 'src/auth/auth.resolvers';
import { UsersModule } from 'src/users/users.module';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'blablabla',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolvers, GqlAuthGuard],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
