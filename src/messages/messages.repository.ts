import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable() //adding this class to the container
export class MessagesRepository {
    // read/write => async/await

    async findOne(id: string) {
        const messages = await this.readMessagesFile();
        return messages[id];
    }

    async findAll() {
        return await this.readMessagesFile();
    }

    async create(content: string) {
        //There is maybe messages, and maybe there is not. So we need to readFile() first then create the id then writeFile()

        const messages = await this.readMessagesFile();

        //create id & message
        const id = Math.floor(Math.random() * 999)
        messages[id] = { id, content }

        //writeFile: add newMessage to messages
        await writeFile('messages.json', JSON.stringify(messages));
        // JSON.stringify(): Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
    }

    // Helper method to read messages with error handling
    private async readMessagesFile() {
        try {
            const contents = await readFile('messages.json', 'utf8');
            return JSON.parse(contents) || {}; // Return an empty object if file is empty
        } catch (error) {
            // If file does not exist or is empty, return an empty object
            if (error.code === 'ENOENT') return {};
            throw error; // Re-throw if it's another type of error
        }
    }
}