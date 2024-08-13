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
import { Operation } from 'src/operations/operation.entity';

@Table
export class Portfolio extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Asset, () => Operation)
  assets: Asset[];
}
