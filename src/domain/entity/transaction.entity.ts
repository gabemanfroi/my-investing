import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Asset } from 'src/domain/entity/asset.entity';
import { Portfolio } from 'src/domain/entity/portfolio.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

@Table
export class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Portfolio)
  @Column({ unique: false })
  portfolioId: number;

  @ForeignKey(() => Asset)
  @Column({ unique: false })
  assetId: number;

  @Column
  quantity: number;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @BelongsTo(() => Asset)
  asset: Asset;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({
    type: DataType.ENUM(...Object.values(TransactionType)),
    allowNull: false,
  })
  type: TransactionType;
}
