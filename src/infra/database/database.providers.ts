import { Sequelize } from 'sequelize-typescript';
import { Asset, AssetClass } from 'src/assets/asset.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'timescaledb',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'nest_db',
      });
      sequelize.addModels([AssetClass, Asset]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
