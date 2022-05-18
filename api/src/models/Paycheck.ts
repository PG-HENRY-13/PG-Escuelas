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
  // @BelongsTo(() => UsersJobs)
  // userJobs!: UsersJobs;

  // @ForeignKey(() => UsersJobs)
  @PrimaryKey
  @Column
  userCuil!: string;

  // @ForeignKey(() => UsersJobs)
  @PrimaryKey
  @Column
  jobId!: string;

  @PrimaryKey
  @Column
  period!: string; /// formato "202205"

  @Column
  jobName!: string;

  @Column
  baseWage$!: string; // SALARIO BASICO

  @Column
  additionals$!: string; // ADICIONALES NO REMUNERATIVOS

  @Column
  seniority$!: string; // ANTIGUEDAD MONTO $

  @Column
  seniorityYears!: string; // ANTIGUEDAD CANT AÑOS

  @Column
  overTimeHours!: string; // HORAS EXTRA CANTIDAD

  @Column
  overTimeAdditionals$!: string; // HORAS EXTRA EN MONTO $

  @Column
  unexcusedAbsences!: string; // LA CANTIDAD DE FALTAS INJUSTIFICADAS

  @Column
  absencesDeductions$!: string; // EL MONTO DESCONTADO POR FALTAS INJUSTIFICADAS

  @Column
  excusedAbsences!: string; // LA CANTIDAD DE FALTAS JUSTIFICADAS, DESCUENTAN $0

  @Column
  underTimeDeductions$!: string; // EL MONTO DESCONTADO POR HORAS REDUCIDAS

  @Column
  underTimeHours$!: string; // LA CANTIDAD DE HORAS REDUCIDAS

  @Column
  unionDeductions$!: string; // DEDUCCION POR SINDICATO

  @Column
  baseWageCode!: string; // CODIGO DE SALARIO BASE

  @Column
  underTimeDeductionsCode!: string; // CODIGO DE DEDUCCIONES POR HORAS REDUCIDAS

  @Column
  absencesDeductionsCode!: string; // CODIGO DE DEDUCCIONES POR FALTAS

  @Column
  totalAmount!: string; // CANTIDAD MONTO TOTAL A LIQUIDAR

  @Column
  isSigned!: boolean; // INDICA SI EL EMPLEADO FIRMO O NO

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
