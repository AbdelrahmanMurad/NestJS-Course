import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(public messagesService: MessagesService) {}

    @Get()
    async listMessages() {
        return await this.messagesService.findAll();
    }

    @Post()
    async createMessage(@Body() body: CreateMessageDto) {
        console.log(body);
        return await this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message: any = await this.messagesService.findOne(id);

        if (!message) {
            throw new NotFoundException(`Message with ID ${id} not found`);
        }

        return message;
    }
}