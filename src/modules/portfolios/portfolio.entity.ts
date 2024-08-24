import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { Operation } from 'src/modules/operations/operation.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

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

  @HasMany(() => Operation)
  operations: Operation[];
}
