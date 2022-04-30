import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
<<<<<<< HEAD
  BelongsToMany,
=======
>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize/types";
import { User } from "./User";
import { UsersJobs } from "./UsersJobs";

interface Job1 {
  id: string;
  name: string;
}

@Table
<<<<<<< HEAD
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
=======
export class Job extends Model<Job> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
}
