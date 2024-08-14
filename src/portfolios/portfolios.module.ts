import { Module } from '@nestjs/common';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { PortfoliosResolver } from 'src/portfolios/portfolios.resolvers';
import { portfoliosProviders } from 'src/portfolios/portfolios.providers';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PortfoliosService, PortfoliosResolver, ...portfoliosProviders],
})
export class PortfoliosModule {}
