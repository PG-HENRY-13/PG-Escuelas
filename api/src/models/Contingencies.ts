import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

enum ContingencyType {
  Absence = "ausencia",
  overtime = "horas extras",
  lateArrival = "llegada tarde",
  earlyWithdrawal = "retiro temprano",
}

@Table
export class Contingencies extends Model<Contingencies> {
  @Column
  date!: Date;

  @Column
  cuil!: string;

  @Column
  jobId!: string;

  @Column
  contingencyType!: ContingencyType;

  @Column
  hoursNumber!: number;

  @Column
  hasNotice!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
