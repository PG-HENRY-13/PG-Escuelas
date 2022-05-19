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

export interface NewsI{
    userCuil:string;
    title:string;
    text:string;
    createdAt:string;
    updatedAt:string;
}


@Table
export class News extends Model<NewsI> {
  // @BelongsTo(() => UsersJobs)
  // userJobs!: UsersJobs;

  @ForeignKey(() => User)
  // @PrimaryKey
  @Column
  userCuil!: string;


//   @PrimaryKey
  @Column
  title!: string;

  @Column
  text!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
