import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/domain/entity/user.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Transaction } from 'src/domain/entity/transaction.entity';

@Table
export class Portfolio extends Model<
  InferAttributes<Portfolio>,
  InferCreationAttributes<Portfolio>
> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Transaction)
  operations: Transaction[];
}
