import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequest, RegisterRequest } from 'src/graphql';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation('Register')
  async register(@Args('registerRequest') registerRequest: RegisterRequest) {
    const dto = RegisterDto.fromRegisterRequest(registerRequest);
    return RegisterDto.toRegisterResponse(await this.authService.register(dto));
  }

  @Mutation('Login')
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }
}
