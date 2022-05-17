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

import { Job } from "./Job";
import { User } from "./User";
import { UsersJobs } from "./UsersJobs";
import { Paycheck as PaycheckI } from "../../../src/redux/interfaces";
import { DataTypes } from "sequelize/types";

@Table
export class Paycheck extends Model<PaycheckI> {
  @BelongsTo(() => UsersJobs)
  userJobs!: UsersJobs;

  @PrimaryKey
  @ForeignKey(() => UsersJobs)
  @Column
  userCuil!: string;

  @PrimaryKey
  @ForeignKey(() => UsersJobs)
  @Column
  jobId!: string;

  @PrimaryKey
  @Column
  period!: string; /// formato "202205"

  @Column
  jobName!: string;

  @Column
  baseWage$!: string;

  @Column
  additionals$!: string;

  @Column
  seniority$!: string;

  @Column
  overTimeAdditionals$!: string;

  @Column
  unexcusedAbsences!: string; // LA CANTIDAD DE FALTAS INJUSTIFICADAS

  @Column
  absencesDeductions$!: string; // EL MONTO DESCONTADO POR FALTAS INJUSTIFICADAS

  @Column
  excusedAbsences!: string; // LA CANTIDAD DE FALTAS JUSTIFICADAS, DESCUENTAN $0

  @Column
  underTimeDeductions$!: string;

  @Column
  unionDeductions$!: string;

  @Column
  baseWageCode!: string;

  @Column
  underTimeDeductionsCode!: string;

  @Column
  absencesDeductionsCode!: string;

  @Column
  isSigned!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
