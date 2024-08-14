import { Inject, Injectable } from '@nestjs/common';
import { Operation } from 'src/operations/operation.entity';
import { CreateOperationDto } from 'src/operations/dto/create-operation.dto';

@Injectable()
export class OperationsService {
  constructor(
    @Inject('OPERATIONS_REPOSITORY')
    private readonly operationsRepository: typeof Operation,
  ) {}

  registerOperation(dto: CreateOperationDto) {
    const createdOperation = this.operationsRepository.create(dto);
    console.log({ createdOperation });
    return !!createdOperation;
  }
}
