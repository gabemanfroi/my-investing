import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { OperationsModule } from './operations/operations.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'node:path';

@Module({
  imports: [
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
