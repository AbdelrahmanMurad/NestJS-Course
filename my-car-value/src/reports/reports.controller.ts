import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService) { }

    @Get()
    estimateReport(@Query() query: GetEstimateDto) {
        // console.log(query);
        return this.reportsService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard) //use gurad for ensuring that a user is actully signed in before creating a report.
    @Serialize(ReportDto)
    createReport(@Body() body: createReportDto, @CurrentUser() user: UserEntity) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApprove(parseInt(id), body.approve)
    }
}