import { Controller, Get, Injectable } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Injectable()
@Controller('computer')
export class ComputerController {
    constructor(
        private cpuService: CpuService,
        private diskService: DiskService
    ) { }

    @Get()
    run() {
        return [this.cpuService.compute(1, 2), this.diskService.getData()]
    }
}