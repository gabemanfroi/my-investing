import { IsNumber, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Industry } from 'src/domain/entity/asset.entity';

export class ReadIndustryDto {
  @IsString()
  name: string;

  @IsNumber()
  id: number;

  static fromModel(industry: Industry): ReadIndustryDto {
    return plainToInstance(ReadIndustryDto, {
      id: industry.id,
      name: industry.name,
    });
  }
}
