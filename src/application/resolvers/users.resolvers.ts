import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpRequest, SignUpResponse } from 'src/graphql';
import { SignUpDto } from 'src/domain/dto/users/sign-up.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';
import { ISignUpUseCase } from 'src/application/useCases/users/sign-up.use-case';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly signUpUseCase: ISignUpUseCase) {}

  @Mutation(MUTATIONS.SIGN_UP)
  async signUp(
    @Args('signUpRequest') signUpRequest: SignUpRequest,
  ): Promise<SignUpResponse> {
    const dto = SignUpDto.fromSignUpRequest(signUpRequest);
    return SignUpDto.toSignUpResponse(await this.signUpUseCase.execute(dto));
  }
}
