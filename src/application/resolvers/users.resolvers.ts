import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpRequest, SignUpResponse } from 'src/graphql';
import { SignUpDto } from 'src/domain/dto/users/sign-up.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';
import { Inject } from '@nestjs/common';
import {
  ISignUpUseCase,
  SIGN_UP_USE_CASE,
} from 'src/domain/interfaces/use-cases/users/sign-up.use-case.interface';

@Resolver('User')
export class UsersResolvers {
  constructor(
    @Inject(SIGN_UP_USE_CASE)
    private readonly signUpUseCase: ISignUpUseCase,
  ) {}

  @Mutation(MUTATIONS.SIGN_UP)
  async signUp(
    @Args('signUpRequest') signUpRequest: SignUpRequest,
  ): Promise<SignUpResponse> {
    const dto = SignUpDto.fromSignUpRequest(signUpRequest);
    return SignUpDto.toSignUpResponse(await this.signUpUseCase.execute(dto));
  }
}
