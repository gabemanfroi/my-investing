import { repositoryProviders } from 'src/infra/providers/users/user.repository.providers';
import { useCasesProviders } from 'src/infra/providers/users/user.use-cases.providers';

export const usersProviders = [...repositoryProviders, ...useCasesProviders];
