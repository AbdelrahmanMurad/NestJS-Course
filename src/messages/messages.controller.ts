import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto'

@Controller('/messages')
export class MessagesController {
    @Get()
    listMessages() { }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        console.log(body);
    }

    @Get('/:id')
    getMessage(@Param('id') id: string) {
        console.log(id);
    }
}

/*
    @Controller('/messages')  is a class decorator.
    
    @Get() is a method decorators
    @Post() is a method decorators
    @Get('/:id') is a  method decorators
    
    @Body() is an argument decroators
    @Param() is an argument decroators
*/