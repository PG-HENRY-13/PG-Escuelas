import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import { Job } from "./Job";
import { UsersJobs } from "./UsersJobs";
import { Paycheck } from "./Paycheck";
import { User as UserI } from "../../../src/redux/interfaces";

enum RoleType {
  Admin = "admin",
  Employee = "empleado",
  Manager = "gerente",
}

enum GenderType {
  Male = "masc",
  Female = "fem",
  Other = "otro",
}

@Table
export class User extends Model<UserI> {
  @BelongsToMany(() => Job, () => UsersJobs)
  jobs!: Job[];

  @HasMany(() => Paycheck)
  paychecks!: Paycheck[];

  @PrimaryKey
  @Column
  cuil!: string;

  @Column
  name!: string;

  @Column
  lastName!: string;

  @Column
  password!: string;

  @Column
  phoneNumber!: string;

  @Column
  emailAddress!: string;

  @Column
  address!: string;

  @Column
  gender!: GenderType; // Un enumerador que definí arriba con 3 casos

  @Column
  role!: RoleType; // Un enumerador que definí arriba con 3 casos

  @CreatedAt
  @Column
  seniorityDate!: Date; // Es lo que se llama fecha de escalafón

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
