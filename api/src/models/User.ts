import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

enum RoleType {
  Admin = "admin",
  Employee = "employee",
  Manager = "manager",
}

enum GenderType {
  Male = "male",
  Female = "female",
  Other = "other",
}

@Table
export class User extends Model<User> {
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
  address!: string;

  @Column
  phoneNumber!: string;

  @Column
  emailAddress!: string;

  @Column
  gender!: GenderType; // Un enumerador que definí arriba con 3 casos

  @Column
  role!: RoleType; // Un enumerador que definí arriba con 3 casos

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
