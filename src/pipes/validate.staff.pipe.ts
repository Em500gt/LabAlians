import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Positions } from '../modules/staff/entities/positions.entity';
import { Divisions } from '../modules/staff/entities/divisions.entity';
import { StaffGroups } from '../modules/staff/entities/staff.groups.entity';
import { Accounts } from 'src/modules/staff/entities/accounts.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';

@Injectable()
export class ValidateAndTransformPipe implements PipeTransform {
    constructor(
        @InjectRepository(Positions)
        private readonly positionsRepository: Repository<Positions>,

        @InjectRepository(Divisions)
        private readonly divisionsRepository: Repository<Divisions>,

        @InjectRepository(StaffGroups)
        private readonly staffGroupsRepository: Repository<StaffGroups>,

        @InjectRepository(Accounts)
        private readonly accountRepository: Repository<Accounts>,

        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) { }

    async transform(value: any) {

        if (!value || Object.keys(value).length === 0) {
            throw new BadRequestException('Empty request body. No data to update.');
        }
        
        if (value.login) {
            const existingAccount = await this.accountRepository.findOne({ where: { login: value.login } });
            if (existingAccount) {
                throw new BadRequestException('Login already exists');
            }
        }

        if (value.tabelNum) {
            const tabelNum = await this.staffRepository.findOne({ where: { tabelNum: value.tabelNum } })
            if (tabelNum) {
                throw new BadRequestException('Tabel number already exists');
            }
        }

        let positionID;
        if (value.positionID) {
            const position = await this.positionsRepository.findOne({ where: { id: value.positionID } });
            if (!position) {
                throw new NotFoundException('Position not found');
            }
            positionID = position.id;
        }

        let divisionID;
        if (value.divisionID) {
            const division = await this.divisionsRepository.findOne({ where: { id: value.divisionID } });
            if (!division) {
                throw new NotFoundException('Division not found');
            }
            divisionID = division.id;
        }

        let staffGroupID;
        if (value.staffGroupID) {
            const staffGroup = await this.staffGroupsRepository.findOne({ where: { id: value.staffGroupID } });
            if (!staffGroup) {
                throw new NotFoundException('Staff group not found');
            }
            staffGroupID = staffGroup.id;
        }

        return {
            ...value,
            positionID: positionID,
            divisionID: divisionID,
            staffGroupID: staffGroupID,
        };
    }
}