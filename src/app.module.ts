import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'node:path';
import { AssetsModule } from 'src/infra/modules/assets.module';
import { UsersModule } from 'src/infra/modules/users.module';
import { PortfoliosModule } from 'src/infra/modules/portfolios.module';
import { TransactionsModule } from 'src/infra/modules/transactions.module';
import { StockMarketModule } from './infra/stock-market/stock-market.module';
import { AppConfigModule } from 'src/infra/config/app-config.module';
import { AuthModule } from 'src/infra/modules/auth.module';
import { CommonAuthModule } from 'src/infra/core/common-auth/common-auth.module';

@Module({
  imports: [
    AppConfigModule,
    AssetsModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: path.join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'interface',
      },
    }),
    UsersModule,
    PortfoliosModule,
    TransactionsModule,
    CommonAuthModule,
    AuthModule,
    StockMarketModule,
  ],
})
export class AppModule {}
