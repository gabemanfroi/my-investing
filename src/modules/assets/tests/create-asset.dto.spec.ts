import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAssetInput } from 'src/graphql';
import { CreateAssetDto } from 'src/modules/assets/dto/create-asset.dto';

describe('CreateAssetDto', () => {
  describe('fromCreateAssetInput', () => {
    it('should correctly transform CreateAssetInput to CreateAssetDto', () => {
      const createAssetInput: CreateAssetInput = {
        symbol: 'ABCD3',
        assetClassId: '1', // simulate input from GraphQL, which might be a string
      };

      const createAssetDto =
        CreateAssetDto.fromCreateAssetInput(createAssetInput);

      expect(createAssetDto).toBeInstanceOf(CreateAssetDto);
      expect(createAssetDto.symbol).toBe('ABCD3');
      expect(createAssetDto.assetClassId).toBe(1);
    });
  });

  describe('Validation', () => {
    it('should pass validation with valid input', async () => {
      const createAssetDto = plainToInstance(CreateAssetDto, {
        symbol: 'ABCD3',
        assetClassId: 1,
      });

      const errors = await validate(createAssetDto);
      expect(errors.length).toBe(0);
    });

    it('should fail validation if symbol is not a string', async () => {
      const createAssetDto = plainToInstance(CreateAssetDto, {
        symbol: 1234, // Invalid: should be a string
        assetClassId: 1,
      });

      const errors = await validate(createAssetDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('symbol');
      expect(errors[0].constraints.isString).toBeDefined();
    });

    it('should fail validation if assetClassId is not a number', async () => {
      const createAssetDto = plainToInstance(CreateAssetDto, {
        symbol: 'ABCD3',
        assetClassId: 'not-a-number', // Invalid: should be a number
      });

      const errors = await validate(createAssetDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('assetClassId');
      expect(errors[0].constraints.isNumber).toBeDefined();
    });
  });
});
