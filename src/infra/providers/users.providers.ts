import { User } from 'src/domain/entity/user.entity';

const USER_REPOSITORY = 'USER_REPOSITORY';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
