import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'node:path';
import { AssetsModule } from 'src/modules/assets/assets.module';
import { UsersModule } from 'src/modules/users/users.module';
import { PortfoliosModule } from 'src/modules/portfolios/portfolios.module';
import { OperationsModule } from 'src/modules/operations/operations.module';
import { StockMarketModule } from './modules/stock-market/stock-market.module';
import { AppConfigModule } from 'src/infra/config/app-config.module';
import { AuthModule } from 'src/modules/auth/auth.module';
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
    OperationsModule,
    CommonAuthModule,
    AuthModule,
    StockMarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
