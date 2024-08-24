import { Column, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

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
}
