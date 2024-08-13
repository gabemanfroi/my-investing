import { Sequelize } from 'sequelize-typescript';
import { Asset, AssetClass } from 'src/assets/asset.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([AssetClass, Asset]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
