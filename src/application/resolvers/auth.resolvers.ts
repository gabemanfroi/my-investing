import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginRequest } from 'src/graphql';
import { LoginDto } from 'src/domain/dto/auth/login.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';
import { ILoginUseCase } from 'src/application/useCases/auth/login.use-case';
import { Inject } from '@nestjs/common';
import { LOGIN_USE_CASE } from 'src/infra/providers/auth.providers';

@Resolver('Auth')
export class AuthResolvers {
  constructor(
    @Inject(LOGIN_USE_CASE)
    private readonly loginUseCase: ILoginUseCase,
  ) {}

  @Mutation(MUTATIONS.LOGIN)
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    return LoginDto.toLoginResponse(
      await this.loginUseCase.execute(loginRequest),
    );
  }
}
