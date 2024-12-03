import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard) //use gurad for ensuring that a user is actully signed in before creating a report.
    @Serialize(ReportDto)
    createReport(@Body() body: createReportDto, @CurrentUser() user: UserEntity) {
        return this.reportsService.create(body, user);
    }
}
