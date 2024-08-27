import { User } from 'src/domain/entity/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const repositoriesProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
