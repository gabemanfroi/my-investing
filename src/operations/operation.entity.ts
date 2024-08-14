import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
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

  @Column
  price: number;

  @Column({
    type: DataType.ENUM(...Object.values(OperationType)),
    allowNull: false,
  })
  type: OperationType;
}
