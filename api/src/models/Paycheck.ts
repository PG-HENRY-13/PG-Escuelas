import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { User } from "./User";

@Table
export class Paycheck extends Model<Paycheck> {
  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column
  userCuil!: string;

  @Column
  date!: Date;

  @Column
  absences?: number;

  @Column
  excusedAbsences?: number;

  @Column
  extraHours?: number;

  @Column
  totalValue!: number;

  @Column
  period!: string;

  @Default(false)
  @Column
  hasSigned!: boolean;

  @PrimaryKey
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
