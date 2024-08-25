import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginRequest, SignUpRequest, SignUpResponse } from 'src/graphql';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation(MUTATIONS.SIGN_UP)
  async register(
    @Args('registerRequest') registerRequest: SignUpRequest,
  ): Promise<SignUpResponse> {
    const dto = SignUpDto.fromRegisterRequest(registerRequest);
    return SignUpDto.toSignUpResponse(await this.authService.register(dto));
  }

  @Mutation(MUTATIONS.LOGIN)
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    return LoginDto.toLoginResponse(await this.authService.login(loginRequest));
  }
}
