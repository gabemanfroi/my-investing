import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsResolvers } from 'src/application/resolvers/transactions.resolvers';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { RegisterTransactionRequest, TransactionType } from 'src/graphql';

describe('OperationsResolvers', () => {
  let resolver: TransactionsResolvers;
  let operationsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsResolvers,
        {
          provide: TransactionsService,
          useValue: {
            registerOperation: jest.fn(), // Mocking the registerOperation method
          },
        },
      ],
    }).compile();

    resolver = module.get<TransactionsResolvers>(TransactionsResolvers);
    operationsService = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('registerOperation', () => {
    it('should call OperationsService.registerOperation with correct input', async () => {
      const input: RegisterTransactionRequest = {
        transaction: {
          assetId: '1',
          price: 100,
          quantity: 10,
          type: TransactionType.BUY,
        },
        portfolioId: '1',
      };

      const expectedResult = { id: 1, ...input.transaction }; // Assuming the service returns this

      (operationsService.registerOperation as jest.Mock).mockResolvedValue(
        expectedResult,
      );

      const result = await resolver.registerOperation(input);

      expect(operationsService.registerOperation).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });

    it('should handle errors thrown by OperationsService.registerOperation', async () => {
      const input: RegisterTransactionRequest = {
        transaction: {
          assetId: '1',
          price: 100,
          quantity: 10,
          type: TransactionType.BUY,
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
