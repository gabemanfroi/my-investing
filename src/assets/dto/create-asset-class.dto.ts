import { IsString } from 'class-validator';

export class CreateAssetClassDto {
  @IsString()
  name: string;
}
