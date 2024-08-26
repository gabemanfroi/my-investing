import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Asset } from 'src/domain/entity/asset.entity';

@Table
export class Currency extends Model<
  InferAttributes<Currency>,
  InferCreationAttributes<Currency>
> {
  @Column({
    unique: true,
  })
  symbol: string;

  @Column
  name: string;

  @HasMany(() => Asset)
  assets: Asset[];
}
