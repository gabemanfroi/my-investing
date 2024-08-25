import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from 'src/modules/users/user.entity';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { CommonAuthService } from 'src/infra/core/common-auth/common-auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly commonAuthService: CommonAuthService,
    private readonly appConfigService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtSecret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.commonAuthService.validateUserByEmail(
      payload.email,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
