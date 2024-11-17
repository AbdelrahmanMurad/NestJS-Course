import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number
}

// we will come to these decorators later