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
export class WageConcept
 extends Model<WageConcept
> {
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
