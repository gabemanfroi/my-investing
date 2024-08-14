import { Module } from '@nestjs/common';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { PortfoliosResolver } from 'src/portfolios/portfolios.resolvers';
import { portfoliosProviders } from 'src/portfolios/portfolios.providers';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [PortfoliosService, PortfoliosResolver, ...portfoliosProviders],
})
export class PortfoliosModule {}
