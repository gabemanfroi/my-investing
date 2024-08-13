import { Injectable } from '@nestjs/common';
import { RegisterOperationInput } from 'src/graphql';

@Injectable()
export class OperationsService {
  registerOperation(registerOperationInput: RegisterOperationInput) {
    return Promise.resolve(registerOperationInput);
  }
}
