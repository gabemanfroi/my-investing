import { Inject, Injectable } from '@nestjs/common';
import { Operation } from 'src/modules/operations/operation.entity';
import { CreateOperationDto } from 'src/modules/operations/dto/create-operation.dto';

@Injectable()
export class OperationsService {
  constructor(
    @Inject('OPERATIONS_REPOSITORY')
    private readonly operationsRepository: typeof Operation,
  ) {}

  registerOperation(dto: CreateOperationDto) {
    const createdOperation = this.operationsRepository.create(dto);
    return !!createdOperation;
  }
}
