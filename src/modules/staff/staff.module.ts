import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { UserGroups } from './entities/user.groups.entity';
import { Positions } from './entities/positions.entity';
import { Divisions } from './entities/divisions.entity';
import { Accounts } from './entities/accounts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Staff, UserGroups, Positions, Divisions, Accounts])],
})
export class StaffModule { }
