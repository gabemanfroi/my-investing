import { IsNumber, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Currency } from 'src/modules/shared/entities/currency.entity';

export class ReadCurrencyDto {
  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  id: number;

  static fromModel(currency: Currency): ReadCurrencyDto {
    return plainToInstance(ReadCurrencyDto, {
      id: Number(currency.id),
      name: currency.name,
      symbol: currency.symbol,
    });
  }
}
