import { Sequelize } from 'sequelize-typescript';
import { Asset, AssetClass } from 'src/assets/asset.entity';
import { User } from 'src/users/user.entity';
import { Portfolio, PortfolioAsset } from 'src/portfolio/portfolio.entity';

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
        define: {
          underscored: true,
        },
      });
      sequelize.addModels([AssetClass, Asset, User, Portfolio, PortfolioAsset]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
