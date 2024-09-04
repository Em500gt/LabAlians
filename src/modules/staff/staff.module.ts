import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffGroups } from './entities/staff.groups.entity';
import { Positions } from './entities/positions.entity';
import { Divisions } from './entities/divisions.entity';
import { Accounts } from './entities/accounts.entity';
import { StaffController } from './controllers/staff.controller';
import { StaffService } from './services/staff.service';
import { DivisionController } from './controllers/division.controller';
import { PositionController } from './controllers/position.controller';
import { StaffGroupsController } from './controllers/staffgroups.controller';
import { DivisionService } from './services/division.service';
import { PositionService } from './services/position.service';
import { StaffGroupsService } from './services/staffgroups.service';


@Module({
    imports: [TypeOrmModule.forFeature([Staff, StaffGroups, Positions, Divisions, Accounts])],
    controllers: [StaffController, DivisionController, PositionController, StaffGroupsController],
    providers: [StaffService, DivisionService, PositionService, StaffGroupsService],
    exports: [StaffService]
})
export class StaffModule { }
