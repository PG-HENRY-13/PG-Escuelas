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
  endDate?: Date;

  @Column
  cuil!: string;

  @Column
  fullName!: string;

  @Column
  jobId?: string;

  @Column
  contingencyType!: ContingencyType;

  @Column
  hoursNumber?: number;

  @Column
  hasNotice!: boolean;

  @Column
  reason!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
