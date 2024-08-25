import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Portfolio } from 'src/modules/portfolios/portfolio.entity';

@Table
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasOne(() => Portfolio)
  portfolio: Portfolio;
}
