import { Resolver } from '@nestjs/graphql';
import { AssetsService } from 'src/assets/assets.service';

@Resolver('Assets')
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}
}
