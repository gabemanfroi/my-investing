import { Controller, Get } from '@nestjs/common';
import { AssetsService } from 'src/assets/assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('get-by-user')
  getByUser() {
    return this.assetsService.getAssetsByUser();
  }
}
