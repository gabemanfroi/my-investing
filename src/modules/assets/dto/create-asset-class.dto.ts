import { IsString } from 'class-validator';
import { CreateAssetClassInput } from 'src/graphql';
import { plainToClass } from 'class-transformer';

export class CreateAssetClassDto {
  @IsString()
  name: string;

  static fromCreateAssetClassInputToDto(
    createAssetClassInput: CreateAssetClassInput,
  ): CreateAssetClassDto {
    return plainToClass(CreateAssetClassDto, {
      name: createAssetClassInput.name.toUpperCase(),
    });
  }
}
