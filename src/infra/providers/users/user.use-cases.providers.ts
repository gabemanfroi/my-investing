import { SIGN_UP_USE_CASE } from 'src/domain/interfaces/use-cases/users/sign-up.use-case.interface';
import { SignUpUseCase } from 'src/application/useCases/users/sign-up.use-case';

export const useCasesProviders = [
  {
    provide: SIGN_UP_USE_CASE,
    useClass: SignUpUseCase,
  },
];
