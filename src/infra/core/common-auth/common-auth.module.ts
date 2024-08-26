import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
import { GqlAuthGuard } from 'src/infra/guards/gql.auth.guard';
import { PassportModule } from '@nestjs/passport';
import { CommonAuthService } from './common-auth.service';
import { UsersModule } from 'src/infra/modules/users.module';

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, GqlAuthGuard, CommonAuthService],
  exports: [JwtStrategy, GqlAuthGuard, CommonAuthService],
})
export class CommonAuthModule {}
