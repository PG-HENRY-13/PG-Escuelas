import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  DataType,
  HasOne
} from "sequelize-typescript";

import {User} from "./User";

@Table
export class Paycheck extends Model<Paycheck> {
  @HasOne(() => User)
  user!: User[];

  @Column
  date!: Date;

  @Column
  totalValue!: number;

  @Default(false)
  @Column
  hasSigned!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
