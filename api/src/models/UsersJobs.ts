import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsToMany,
  ForeignKey,
  Default,
  HasMany,
  BelongsTo,
  Sequelize,
  AutoIncrement,
} from "sequelize-typescript";
const { Op } = require("sequelize");
import { User } from "./User";
import { Job } from "./Job";
import { Paycheck } from "./Paycheck";
import { Contingencies } from "./Contingencies";
import { sequelize } from "../db";

@Table
export class UsersJobs extends Model<any> {
  // @HasMany(() => Paycheck)
  // paychecks!: Paycheck[];

  @HasMany(() => Contingencies)
  contingencies?: Contingencies[];

  @PrimaryKey
  @AutoIncrement
  @Column
  idAuto!: number;

  @ForeignKey(() => User)
  @Column
  UserCuil!: string;

  // @PrimaryKey
  @ForeignKey(() => Job)
  @Column
  JobId!: string;

  @BelongsTo(() => User)
  userData!: User;

  @BelongsTo(() => Job)
  jobData!: Job;

  @Default("")
  @Column
  funcJer!: string;

  @Default("")
  @Column
  basico!: string;

  @Default("")
  @Column
  antig!: string;

  @Default("")
  @Column
  zona!: string;

  @Default("")
  @Column
  addRem!: string;

  @Default("")
  @Column
  dedExcl!: string;

  get getJobId() {
    return this.UserCuil;
  }
}
