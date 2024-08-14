import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Operation } from 'src/operations/operation.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table
export class AssetClass extends Model<
  InferAttributes<AssetClass>,
  InferCreationAttributes<AssetClass>
> {
  @Column
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}

@Table
export class Asset extends Model<
  InferAttributes<Asset>,
  InferCreationAttributes<Asset>
> {
  @Column
  ticker: string;

  @ForeignKey(() => AssetClass)
  @Column
  assetClassId: number;

  @BelongsTo(() => AssetClass)
  class: AssetClass;

  @HasMany(() => Operation)
  operations: Operation[];
}
