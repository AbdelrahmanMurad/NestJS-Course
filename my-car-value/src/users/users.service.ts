import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    // Here where we call the repo, by the di.
    /* old structure of making di
    repo: Repository<UserEntity>
    constructor(repo: Repository<UserEntity>) {
        this.repo = repo;
    }
    */

    // Refactoring
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) { } // this line just in service

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    // update(id: number, newEmail: string, newPassword: string) {} // Thats not good design [not recommended]
    async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.repo.findOneBy({ id });
        if (!user) throw new NotFoundException('User Not Found');
        Object.assign(user, attrs);
        return this.repo.save(user);
        // find id
        // if user not exist
        // update by assign
        // save
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({ id });
        if (!user) throw new NotFoundException('User Not Found');
        return this.repo.remove(user);
        // find id
        // if user not exist
        // remove
    }
}