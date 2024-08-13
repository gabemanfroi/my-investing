import { Sequelize } from 'sequelize-typescript';
import { Asset, AssetClass } from 'src/assets/asset.entity';
import { User } from 'src/users/user.entity';

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
      sequelize.addModels([AssetClass, Asset, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
