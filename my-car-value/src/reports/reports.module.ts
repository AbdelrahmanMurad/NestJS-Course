import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportEntity } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [TypeOrmModule.forFeature([ReportEntity])] // This line what's create our repo for us
})
export class ReportsModule { }
