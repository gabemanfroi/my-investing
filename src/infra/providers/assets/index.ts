import { repositoryProviders } from 'src/infra/providers/assets/assets.repository.providers';
import { useCasesProviders } from 'src/infra/providers/assets/assets.use-cases.providers';

export const assetsProviders = [...repositoryProviders, ...useCasesProviders];
