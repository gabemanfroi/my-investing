import { User } from 'src/users/user.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
