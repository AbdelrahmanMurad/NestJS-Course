import { UserEntity } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

console.log(UserEntity);

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number

    // make => the company who made a vehicle. [Honda, Hyundai, Toyota, so on]
    @Column()
    make: string

    // model => the actual model of the vehicle. [Mustang, Corolla or what have you]
    @Column()
    model: string

    // year => store the year that the vehicle was manufactured.
    @Column()
    year: number

    /* longitude [lng] & latitude [lat]:
    The longitude and latitude of the sale of the vehicle. 
    So essentially where the vehicle was sold because a vehicle that's sold in one country might have a
    totally different price expectation than a vehicle sold in a different country.
    */
    @Column()
    lng: number

    @Column()
    lat: number

    /* mileage
    the number of miles or kilometers that the vehicle was driven when it was actually sold 
    because more miles or more kilometers on a vehicle decreases its value.
    */
    @Column()
    mileage: number

    @ManyToOne(() => UserEntity, (user) => user.reports)
    user: UserEntity; // one user
}