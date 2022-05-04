import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table
export class Paycheck extends Model<Paycheck> {
  @Column
  date!: Date;

  @Column
  totalValue!: number;

  @Column
  hasSigned!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
