import { Test, TestingModule } from '@nestjs/testing';
import { OperationsService } from 'src/operations/operations.service';
import { OperationType, RegisterOperationInput } from 'src/graphql';
import { OperationsResolvers } from 'src/operations/operations.resolvers';

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
    it('should return true if operation is registered successfully', async () => {
      const input: RegisterOperationInput = {
        operation: {
          assetId: '1',
          price: 100,
          quantity: 10,
          type: OperationType.BUY,
        },
        portfolioId: '1',
      };

      (operationsService.registerOperation as jest.Mock).mockResolvedValue({
        id: 1,
      });

      const result = await resolver.registerOperation(input);
      expect(result).toBe(true);
      expect(operationsService.registerOperation).toHaveBeenCalledWith(input);
    });

    it('should return false if operation registration fails', async () => {
      const input: RegisterOperationInput = {
        operation: {
          assetId: '1',
          price: 100,
          quantity: 10,
          type: OperationType.BUY,
        },
        portfolioId: '1',
      };

      (operationsService.registerOperation as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await resolver.registerOperation(input);
      expect(result).toBe(false);
      expect(operationsService.registerOperation).toHaveBeenCalledWith(input);
    });

    it('should return false if an exception is thrown', async () => {
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

      const result = await resolver.registerOperation(input);
      expect(result).toBe(false);
    });
  });
});
