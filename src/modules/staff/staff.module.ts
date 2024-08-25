import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffGroups } from './entities/staff.groups.entity';
import { Positions } from './entities/positions.entity';
import { Divisions } from './entities/divisions.entity';
import { Accounts } from './entities/accounts.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
    imports: [TypeOrmModule.forFeature([Staff, StaffGroups, Positions, Divisions, Accounts])],
    controllers: [StaffController],
    providers: [StaffService]
})
export class StaffModule { }
