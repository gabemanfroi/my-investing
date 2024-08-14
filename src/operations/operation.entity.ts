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
import { Asset } from 'src/assets/asset.entity';
import { Portfolio } from 'src/portfolios/portfolio.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

export enum OperationType {
  BUY = 'BUY',
  SELL = 'SELL',
}

@Table
export class Operation extends Model<
  InferAttributes<Operation>,
  InferCreationAttributes<Operation>
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
    type: DataType.ENUM(...Object.values(OperationType)),
    allowNull: false,
  })
  type: OperationType;
}
