import { IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString() 
    content: string;
}

/*
@IsString()
This is going to make sure that whenever we create an instance of createmessageDto, we can make sure that the content property actually
is a string as opposed to a number undefined null or anything like that. [not number, undefined, null, or anything like that]
*/