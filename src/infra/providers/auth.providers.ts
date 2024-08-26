import {
  ILoginUseCaseToken,
  LoginUseCase,
} from 'src/application/useCases/auth/login.use-case';

export const authProviders = [
  {
    provide: ILoginUseCaseToken,
    useClass: LoginUseCase,
  },
];
