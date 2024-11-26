import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// promisify: https://www.notion.so/Handling-Async-JS-138db80be6e980f79c09dc543540d648?pvs=4#138db80be6e980598a70ea701183bc11
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string) {
        /*
        1. Check email.
            1. Exist ⇒ Error.
            2. Not Exist ⇒ Hash Password:
                1. Generate a salt (a random string to make the hash unique).
                2. Hash the salt and the password together.
                3. Combine the salt and the hashed password (e.g., `salt.hashedPassword`).
                4. Create user.
                5. Return user.
        */

        // See if email in use:
        const user = await this.usersService.find(email);
        if (user.length) throw new BadRequestException('email in use');

        // Hash user password:
        // Generate a salt
        const salt = randomBytes(8).toString('hex');
        // Hash the salt and the password together
        const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
        // Combine the salt and the hashed password 
        const result = salt + "." + hashedPassword.toString('hex');

        // Create user
        const newUser = await this.usersService.create(email, result);

        // Return user
        return newUser;
    }

    async signin(email: string, password: string) {
        /*
        1. Check email:
            1. Not Exist ⇒ Error.
            2. Exist ⇒ Hash Password.
                1. Extract salt and hashedPassword from the stored password in the database.
                2. Hash the provided password with the extracted salt.
                3. Compare Passwrods:
                    1. False ⇒ Error.
                    2. True ⇒ Return user.
        */

        // See if user exists
        const [user] = await this.usersService.find(email);
        if (!user) throw new NotFoundException('user not found')

        // Extract salt and hashedPassword from the db.
        const [salt, storedHash] = user.password.split('.');

        // Hash the provided password with the extracted salt.
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Compare the hashed result with the stored hashed password
        if (storedHash !== hash.toString('hex')) throw new BadRequestException("password is wrong")
        return user;
    }
}