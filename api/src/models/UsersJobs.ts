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
} from "sequelize-typescript";
import { User } from "./User";
import { Job } from "./Job";
import { Paycheck } from "./Paycheck";
import { Contingencies } from "./Contingencies";

@Table
export class UsersJobs extends Model<UsersJobs> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  UserCuil!: string;

  @PrimaryKey
  @ForeignKey(() => Job)
  @Column
  JobId!: string;

  @HasMany(() => Contingencies)
  contingencies!: Contingencies[];

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
}
