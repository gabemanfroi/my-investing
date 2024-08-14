import { validate } from 'class-validator';
import { AssetClass } from 'src/assets/asset.entity';
import { ReadAssetClassDto } from 'src/assets/dto/read-asset-class.dto'; // Adjust path as necessary

describe('ReadAssetClassDto', () => {
  it('should validate the fields correctly', async () => {
    const dto = new ReadAssetClassDto();
    dto.id = 1;
    dto.name = 'Equity';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if a required field is missing', async () => {
    const dto = new ReadAssetClassDto();
    dto.id = 1;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should convert an AssetClass model to ReadAssetClassDto', () => {
    const assetClass: AssetClass = { id: 1, name: 'Equity' } as any;

    const dto = ReadAssetClassDto.fromModel(assetClass);

    expect(dto).toBeInstanceOf(ReadAssetClassDto);
    expect(dto.id).toBe(1);
    expect(dto.name).toBe('Equity');
  });

  it('should convert an array of AssetClass models to ReadAssetClassDto[]', () => {
    const class1: AssetClass = { id: 1, name: 'Equity' } as any;
    const class2: AssetClass = { id: 2, name: 'Fixed Income' } as any;

    const dtos = ReadAssetClassDto.manyFromModel([class1, class2]);

    expect(dtos.length).toBe(2);
    expect(dtos[0].id).toBe(1);
    expect(dtos[0].name).toBe('Equity');
    expect(dtos[1].id).toBe(2);
    expect(dtos[1].name).toBe('Fixed Income');
  });

  it('should convert ReadAssetClassDto[] to ListAssetsClassesResponse', () => {
    const dto1 = new ReadAssetClassDto();
    dto1.id = 1;
    dto1.name = 'Equity';

    const dto2 = new ReadAssetClassDto();
    dto2.id = 2;
    dto2.name = 'Fixed Income';

    const response = ReadAssetClassDto.toListAssetsClassesResponse([
      dto1,
      dto2,
    ]);

    expect(response.assetClasses.length).toBe(2);
    expect(response.assetClasses[0].id).toBe('1');
    expect(response.assetClasses[0].name).toBe('Equity');
    expect(response.assetClasses[1].id).toBe('2');
    expect(response.assetClasses[1].name).toBe('Fixed Income');
  });
});
