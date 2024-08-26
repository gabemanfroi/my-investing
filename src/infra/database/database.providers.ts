import { Sequelize } from 'sequelize-typescript';
import {
  Asset,
  AssetClass,
  Exchange,
  Industry,
  Sector,
} from 'src/domain/entity/asset.entity';
import { User } from 'src/modules/users/user.entity';
import { Portfolio } from 'src/modules/portfolios/portfolio.entity';
import { Operation } from 'src/modules/transactions/operation.entity';
import { AppConfigService } from 'src/infra/config/app-config.service';
import { Currency } from 'src/modules/shared/entities/currency.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (appConfigService: AppConfigService) => {
      const sequelize = new Sequelize({
        dialect: appConfigService.databaseDialect as unknown as any,
        host: appConfigService.databaseHost,
        port: appConfigService.databasePort,
        username: appConfigService.databaseUser,
        password: appConfigService.databasePassword,
        database: appConfigService.databaseName,
        define: {
          underscored: true,
        },
      });
      sequelize.addModels([
        AssetClass,
        Asset,
        User,
        Portfolio,
        Operation,
        Currency,
        Sector,
        Exchange,
        Industry,
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [AppConfigService],
  },
];
