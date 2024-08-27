import { SignUpDto } from 'src/domain/dto/users/sign-up.dto';

export const SIGN_UP_USE_CASE = 'SIGN_UP_USE_CASE';

export interface ISignUpUseCase {
  execute(dto: SignUpDto): Promise<{ accessToken: string }>;
}
