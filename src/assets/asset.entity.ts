import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

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
}
