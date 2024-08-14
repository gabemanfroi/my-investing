import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolvers } from 'src/auth/auth.resolvers';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'blablabla',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolvers],
  exports: [AuthService],
})
export class AuthModule {}
