import { Test, TestingModule } from '@nestjs/testing';
import { Assets } from './assets';

describe('Assets', () => {
  let provider: Assets;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Assets],
    }).compile();

    provider = module.get<Assets>(Assets);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
