import { useCasesProviders } from 'src/infra/providers/users/user.use-cases.providers';
import { repositoriesProviders } from 'src/infra/providers/users/user.repositories.providers';

export const usersProviders = [...repositoriesProviders, ...useCasesProviders];
