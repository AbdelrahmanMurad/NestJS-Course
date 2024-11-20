import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}


/* 
What is the differences between @Expose() & @Exlude() ??
@Exlude(): dont share this property
@Expose(): do share this property
*/