import { User } from 'src/domain/entity/user.entity';
import { SignUpUseCase } from 'src/application/useCases/users/sign-up.use-case';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export const SIGN_UP_USE_CASE = 'SIGN_UP_USE_CASE';

const repositoryProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];

const useCaseProviders = [
  {
    provide: SIGN_UP_USE_CASE,
    useClass: SignUpUseCase,
  },
];

export const usersProviders = [...repositoryProviders, ...useCaseProviders];
