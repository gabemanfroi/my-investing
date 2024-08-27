import { LIST_ASSETS_USE_CASE } from 'src/domain/interfaces/use-cases/assets/list-assets.use-case.interface';
import { ListAssetsUseCase } from 'src/application/useCases/assets/list-assets.use-case';

export const useCasesProviders = [
  {
    provide: LIST_ASSETS_USE_CASE,
    useClass: ListAssetsUseCase,
  },
];
