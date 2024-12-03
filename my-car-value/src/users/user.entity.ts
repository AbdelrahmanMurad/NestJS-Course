import { ReportEntity } from "src/reports/report.entity";
import { AfterInsert, AfterRemove, AfterUpdate, BeforeRemove, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

console.log(ReportEntity);


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    // @AfterRemove() // Output: Removed User with id undefined;  it happens because we are trying to show the id of an entity after being removed.
    @BeforeRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[]; // why array ?? because group of reports
}   