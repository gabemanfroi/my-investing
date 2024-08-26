import { IsNumber, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Sector } from 'src/domain/entity/asset.entity';

export class ReadSectorDto {
  @IsString()
  name: string;

  @IsNumber()
  id: number;

  static fromModel(sector: Sector): ReadSectorDto {
    return plainToInstance(ReadSectorDto, {
      id: sector.id,
      name: sector.name,
    });
  }
}
