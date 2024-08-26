import { validate } from 'class-validator';
import { ReadAssetClassDto } from 'src/domain/dto/assets/read-asset-class.dto';
import { ReadAssetDto } from 'src/domain/dto/assets/read-asset.dto';

class MockAsset {
  id: number;
  symbol: string;
  class: {
    id: number;
    name: string;
  };
}

describe('ReadAssetDto', () => {
  it('should validate the fields correctly', async () => {
    const dto = new ReadAssetDto();
    dto.id = 1;
    dto.symbol = 'AAPL';
    dto.class = new ReadAssetClassDto();
    dto.class.id = 1;
    dto.class.name = 'Equity';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if a required field is missing', async () => {
    const dto = new ReadAssetDto();
    dto.id = 1;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should convert an Asset model to ReadAssetDto', () => {
    const asset = new MockAsset();
    asset.id = 1;
    asset.symbol = 'AAPL';
    asset.class = { id: 1, name: 'Equity' } as any; // Mocking class

    const dto = ReadAssetDto.fromModel(asset as any);

    expect(dto).toBeInstanceOf(ReadAssetDto);
    expect(dto.id).toBe(1);
    expect(dto.symbol).toBe('AAPL');
    expect(dto.class.id).toBe(1);
    expect(dto.class.name).toBe('Equity');
  });

  it('should convert an array of Asset models to ReadAssetDto[]', () => {
    const asset1: any = new MockAsset();
    asset1.id = 1;
    asset1.symbol = 'AAPL';
    asset1.class = { id: 1, name: 'Equity' } as any;

    const asset2 = new MockAsset();
    asset2.id = 2;
    asset2.symbol = 'TSLA';
    asset2.class = { id: 2, name: 'Equity' } as any;

    const dtos = ReadAssetDto.manyFromModel([asset1, asset2]);

    expect(dtos.length).toBe(2);
    expect(dtos[0].id).toBe(1);
    expect(dtos[1].id).toBe(2);
  });

  it('should convert ReadAssetDto[] to ListAssetsResponse', () => {
    const dto1 = new ReadAssetDto();
    dto1.id = 1;
    dto1.symbol = 'AAPL';
    dto1.class = { id: 1, name: 'Equity' };

    const dto2 = new ReadAssetDto();
    dto2.id = 2;
    dto2.symbol = 'TSLA';
    dto2.class = { id: 2, name: 'Equity' };

    const response = ReadAssetDto.toListAssetsResponse([dto1, dto2]);

    expect(response.assets.length).toBe(2);
    expect(response.assets[0].id).toBe('1');
    expect(response.assets[1].id).toBe('2');
  });
});
