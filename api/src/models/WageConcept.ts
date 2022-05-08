import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";
import { col } from "sequelize/types";

@Table
export class WageConcept extends Model<WageConcept> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  basic_salary!: number;

  @Column
  remunerative!: number;

  @Column
  no_remunerative!: number;

  @Column
  deductions!: number;

  @Column
  antiquity!:number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
