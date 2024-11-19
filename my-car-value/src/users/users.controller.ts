import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        // Implement user creation logic here
        this.usersService.create(body.email, body.password)
    }


    @Get('/:id')
    // Here we make the id string not number. Why ??
    // The id is coming as a string in the request, so we need to convert it to a number before using it in our service
    // auth/21313213 => string
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    //So we want to look into the query string and pull off the email out of that query string.
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }


    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}