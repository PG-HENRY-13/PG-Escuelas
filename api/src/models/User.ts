import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
<<<<<<< HEAD
  BelongsToMany,
=======
  DataType,
>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
} from "sequelize-typescript";
import { Job } from "./Job";
import { UsersJobs } from "./UsersJobs";

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
export class User extends Model<User> {
<<<<<<< HEAD
  @BelongsToMany(() => Job, () => UsersJobs)
  jobs!: Job[];

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

=======
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

>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
  @UpdatedAt
  @Column
  updatedAt!: Date;
}
