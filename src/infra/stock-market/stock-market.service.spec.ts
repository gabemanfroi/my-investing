import { Test, TestingModule } from '@nestjs/testing';
import { StockMarketService } from 'src/infra/stock-market/stock-market.service';

describe('StockMarketService', () => {
  let service: StockMarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockMarketService],
    }).compile();

    service = module.get<StockMarketService>(StockMarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
