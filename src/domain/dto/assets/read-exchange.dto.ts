import { IsNumber, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Exchange } from 'src/domain/entity/asset.entity';

export class ReadExchangeDto {
  @IsString()
  name: string;

  @IsNumber()
  id: number;

  static fromModel(exchange: Exchange): ReadExchangeDto {
    return plainToInstance(ReadExchangeDto, {
      id: exchange.id,
      name: exchange.name,
    });
  }
}
