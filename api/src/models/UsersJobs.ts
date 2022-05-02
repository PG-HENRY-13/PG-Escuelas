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
} from "sequelize-typescript";
import { User } from "./User";
import { Job } from "./Job";

@Table
export class UsersJobs extends Model<UsersJobs> {
  @ForeignKey(() => User)
  @Column
  UserCuil!: string;

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
