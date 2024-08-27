import { LoginUseCase } from 'src/application/useCases/auth/login.use-case';

export const LOGIN_USE_CASE = 'LOGIN_USE_CASE';

export const authProviders = [
  {
    provide: LOGIN_USE_CASE,
    useClass: LoginUseCase,
  },
];
