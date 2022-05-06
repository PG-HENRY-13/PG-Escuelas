import {
    Model,
    Column,
    Table,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    DataType,
} from "sequelize-typescript";
import { col } from "sequelize/types";

@Table
export class WageConcept
 extends Model<WageConcept
> {
    @PrimaryKey
    @Column
    id!: number;

    @Column
    denomination!: string;

    @Column
    basic_salary!: number;

    @Column
    remunerative!: number;

    @Column
    no_remunerative!: number;

    @Column
    family_asignations!: number;

    @Column
    deductions!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
