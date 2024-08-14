import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from 'src/users/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret_key',
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.validateUser(payload.email, null);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
