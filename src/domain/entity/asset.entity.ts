import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Operation } from 'src/modules/transactions/operation.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Currency } from 'src/modules/shared/entities/currency.entity';

@Table
export class AssetClass extends Model<
  InferAttributes<AssetClass>,
  InferCreationAttributes<AssetClass>
> {
  @Column({
    unique: true,
  })
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}

@Table
export class Industry extends Model<
  InferAttributes<Industry>,
  InferCreationAttributes<Industry>
> {
  @Column({
    unique: true,
  })
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}

@Table
export class Sector extends Model<
  InferAttributes<Sector>,
  InferCreationAttributes<Sector>
> {
  @Column({
    unique: true,
  })
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}

@Table
export class Exchange extends Model<
  InferAttributes<Exchange>,
  InferCreationAttributes<Exchange>
> {
  @Column({
    unique: true,
  })
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}

@Table
export class Asset extends Model<
  InferAttributes<Asset>,
  InferCreationAttributes<Asset>
> {
  @Column({
    unique: true,
  })
  symbol: string;

  @ForeignKey(() => AssetClass)
  @Column
  assetClassId: number;

  @BelongsTo(() => AssetClass)
  class: AssetClass;

  @ForeignKey(() => Industry)
  @Column
  industryId: number;

  @BelongsTo(() => Industry)
  industry: Industry;

  @ForeignKey(() => Sector)
  @Column
  sectorId: number;

  @BelongsTo(() => Sector)
  sector: Sector;

  @ForeignKey(() => Exchange)
  @Column
  exchangeId: number;

  @BelongsTo(() => Exchange)
  exchange: Exchange;

  @ForeignKey(() => Currency)
  @Column
  currencyId: number;

  @BelongsTo(() => Currency)
  currency: Currency;

  @HasMany(() => Operation)
  operations: Operation[];
}
