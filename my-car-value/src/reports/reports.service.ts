import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';
import { createReportDto } from './dtos/create-report.dto';
import { UserEntity } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) { }

    createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('approve IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }

    create(reportDto: createReportDto, user: UserEntity) {
        const report = this.repo.create(reportDto)
        report.user = user; //assign user entity to the user property
        return this.repo.save(report);
    }

    async changeApprove(id: number, approve: boolean) {
        const report = await this.repo.findOneBy({ id });
        if (!report) throw new NotFoundException("Id Not Found")
        report.approve = approve;
        return this.repo.save(report);
    }
}