import { Test, TestingModule } from '@nestjs/testing';
import { OperationsResolvers } from 'src/operations/operations.resolvers';
import { OperationsService } from 'src/operations/operations.service';
import { OperationType, RegisterOperationInput } from 'src/graphql';

describe('OperationsResolvers', () => {
  let resolver: OperationsResolvers;
  let operationsService: OperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsResolvers,
        {
          provide: OperationsService,
          useValue: {
            registerOperation: jest.fn(), // Mocking the registerOperation method
          },
        },
      ],
    }).compile();

    resolver = module.get<OperationsResolvers>(OperationsResolvers);
    operationsService = module.get<OperationsService>(OperationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('registerOperation', () => {
    it('should call OperationsService.registerOperation with correct input', async () => {
      const input: RegisterOperationInput = {
        operation: {
          assetId: '1',
          price: 100,
          quantity: 10,
          type: OperationType.BUY,
        },
        portfolioId: '1',
      };

      const expectedResult = { id: 1, ...input.operation }; // Assuming the service returns this

      (operationsService.registerOperation as jest.Mock).mockResolvedValue(
        expectedResult,
      );

      const result = await resolver.registerOperation(input);

      expect(operationsService.registerOperation).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });

    it('should handle errors thrown by OperationsService.registerOperation', async () => {
      const input: RegisterOperationInput = {
        operation: {
          assetId: '1',
          price: 100,
          quantity: 10,
          type: OperationType.BUY,
        },
        portfolioId: '1',
      };

      (operationsService.registerOperation as jest.Mock).mockRejectedValue(
        new Error('Test error'),
      );

      await expect(resolver.registerOperation(input)).rejects.toThrow(
        'Test error',
      );
    });
  });
});
