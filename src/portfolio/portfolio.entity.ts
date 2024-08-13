import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
import { Asset } from 'src/assets/asset.entity';

@Table
export class Portfolio extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Asset, () => PortfolioAsset)
  assets: Asset[];
}

@Table
export class PortfolioAsset extends Model {
  @ForeignKey(() => Portfolio)
  @Column
  portfolioId: number;

  @ForeignKey(() => Asset)
  @Column
  assetId: number;

  @Column
  quantity: number;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @BelongsTo(() => Asset)
  asset: Asset;
}
