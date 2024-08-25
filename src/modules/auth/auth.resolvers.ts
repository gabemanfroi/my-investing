import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginRequest } from 'src/graphql';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation(MUTATIONS.LOGIN)
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    return LoginDto.toLoginResponse(await this.authService.login(loginRequest));
  }
}
