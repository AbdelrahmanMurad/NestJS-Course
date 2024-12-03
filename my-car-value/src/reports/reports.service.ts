import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';
import { createReportDto } from './dtos/create-report.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) { }

    create(reportDto: createReportDto, user: UserEntity) {
        const report = this.repo.create(reportDto)
        report.user = user; //assign user entity to the user property
        return this.repo.save(report);
    }
}