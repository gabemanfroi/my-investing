import { useCasesProviders } from 'src/infra/providers/assets/assets.use-cases.providers';
import { repositoriesProviders } from 'src/infra/providers/assets/assets.repositories.providers';

export const assetsProviders = [...repositoriesProviders, ...useCasesProviders];
