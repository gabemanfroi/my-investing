import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAssetClassDto } from 'src/modules/assets/dto/create-asset-class.dto';

describe('CreateAssetClassDto', () => {
  it('should validate the name field as a string', async () => {
    const dto = plainToClass(CreateAssetClassDto, { name: 123 });
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBeDefined();
  });

  it('should return an error if the name field is not provided', async () => {
    const dto = plainToClass(CreateAssetClassDto, {});
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBeDefined();
  });

  it('should pass validation when the name is a valid string', async () => {
    const dto = plainToClass(CreateAssetClassDto, { name: 'ValidName' });
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});
