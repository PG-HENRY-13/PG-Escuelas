import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table
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
}
