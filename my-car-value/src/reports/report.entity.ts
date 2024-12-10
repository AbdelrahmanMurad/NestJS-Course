import { UserEntity } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// console.log(UserEntity);

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approve: boolean

    @Column()
    price: number

    @Column()
    make: string

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lng: number

    @Column()
    lat: number

    @Column()
    mileage: number

    @ManyToOne(() => UserEntity, (user) => user.reports)
    user: UserEntity; // one user
}