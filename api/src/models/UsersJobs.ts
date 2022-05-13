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
} from "sequelize-typescript";
import { User } from "./User";
import { Job } from "./Job";
import { Paycheck } from "./Paycheck";

@Table
export class UsersJobs extends Model<UsersJobs> {
  @HasMany(() => Paycheck)
  paychecks!: Paycheck[];

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  UserCuil!: string;

  @PrimaryKey
  @ForeignKey(() => Job)
  @Column
  JobId!: string;

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
