import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginRequest, RegisterRequest } from 'src/graphql';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  async register(@Args('registerRequest') registerRequest: RegisterRequest) {
    const dto = RegisterDto.fromRegisterRequest(registerRequest);
    return RegisterDto.toRegisterResponse(await this.authService.register(dto));
  }

  @Mutation('login')
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    return LoginDto.toLoginResponse(await this.authService.login(loginRequest));
  }
}
