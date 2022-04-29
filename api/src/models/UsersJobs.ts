import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";
import { Job } from "./Job";

@Table
export class UsersJobs extends Model<UsersJobs> {
  @ForeignKey(() => User)
  @Column
  UserCuil!: number;

  @ForeignKey(() => Job)
  @Column
  JobId!: number;
}
