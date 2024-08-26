import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginRequest } from 'src/graphql';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';
import {
  ILoginUseCase,
  ILoginUseCaseToken,
} from 'src/application/useCases/auth/login.use-case';
import { Inject } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolvers {
  constructor(
    @Inject(ILoginUseCaseToken)
    private readonly loginUseCase: ILoginUseCase,
  ) {}

  @Mutation(MUTATIONS.LOGIN)
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    return LoginDto.toLoginResponse(
      await this.loginUseCase.execute(loginRequest),
    );
  }
}
