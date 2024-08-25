import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseDialect(): string {
    return this.configService.get<string>('DATABASE_DIALECT');
  }

  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get databasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  get databaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  get databasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get databaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  get brapiApiKey(): string {
    return this.configService.get<string>('BRAPI_API_KEY');
  }

  get brapiApiHost(): string {
    return this.configService.get<string>('BRAPI_API_HOST');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
