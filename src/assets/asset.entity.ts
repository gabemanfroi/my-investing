import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Portfolio } from 'src/portfolios/portfolio.entity';
import { Operation } from 'src/operations/operation.entity';

@Table
export class AssetClass extends Model {
  @Column
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}

@Table
export class Asset extends Model {
  @Column
  ticker: string;

  @ForeignKey(() => AssetClass)
  @Column
  assetClassId: number;

  @BelongsTo(() => AssetClass)
  class: AssetClass;

  @BelongsToMany(() => Portfolio, () => Operation)
  portfolios: Portfolio[];
}
