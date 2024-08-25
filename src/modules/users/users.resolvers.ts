import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpRequest, SignUpResponse } from 'src/graphql';
import { SignUpDto } from 'src/modules/users/dto/sign-up.dto';
import { MUTATIONS } from 'src/infra/core/constants/mutations';
import { UsersService } from 'src/modules/users/users.service';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(MUTATIONS.SIGN_UP)
  async signUp(
    @Args('signUpRequest') signUpRequest: SignUpRequest,
  ): Promise<SignUpResponse> {
    const dto = SignUpDto.fromSignUpRequest(signUpRequest);
    return SignUpDto.toSignUpResponse(await this.usersService.signUp(dto));
  }
}
