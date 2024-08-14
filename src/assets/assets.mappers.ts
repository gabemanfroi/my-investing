import { CreateAssetClassInput, CreateAssetInput } from 'src/graphql';
import { CreateAssetClassDto } from 'src/assets/dto/create-asset-class.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';

export class AssetsMappers {
  static fromCreateAssetInput(
    createAssetInput: CreateAssetInput,
  ): CreateAssetDto {
    return plainToInstance(CreateAssetDto, {
      ticker: createAssetInput.ticker,
      assetClassId: Number(createAssetInput.assetClassId),
    });
  }
}

export class AssetsClassMapper {
  static fromCreateAssetClassInputToDto(
    createAssetClassInput: CreateAssetClassInput,
  ): CreateAssetClassDto {
    return plainToClass(CreateAssetClassDto, {
      name: createAssetClassInput.name.toUpperCase(),
    });
  }
}
