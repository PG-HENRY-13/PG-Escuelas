import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "./User";
import { UsersJobs } from "./UsersJobs";

interface Job1 {
  id: string;
  name: string;
}

@Table
export class Job extends Model<Job1> {
  @BelongsToMany(() => User, () => UsersJobs)
  users?: User[];

  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string;

  @CreatedAt
  @Column
  createdAt?: Date;

  @UpdatedAt
  @Column
  updatedAt?: Date;
}
