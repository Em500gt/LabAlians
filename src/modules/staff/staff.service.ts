import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CombinedDto } from "./dto/combined.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Staff } from './entities/staff.entity';
import { DeepPartial, Repository } from "typeorm";
import { Accounts } from "./entities/accounts.entity";
import { StaffCreateDto } from "./dto/staff.create.dto";
import { DivisionDto } from "./dto/division.dto";
import { Divisions } from "./entities/divisions.entity";
import { Positions } from "./entities/positions.entity";
import { PositionDto } from "./dto/position.dto";
import { StaffGroups } from "./entities/staff.groups.entity";
import { StaffGroupsDto } from "./dto/staff.groups.dto";
import { UpdateStaffGroupsDto } from "./dto/staff.groups.update.dto";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
        @InjectRepository(Accounts)
        private accountRepository: Repository<Accounts>,
        @InjectRepository(Divisions)
        private divisionRepository: Repository<Divisions>,
        @InjectRepository(Positions)
        private positionRepository: Repository<Positions>,
        @InjectRepository(StaffGroups)
        private staffGroupsRepository: Repository<StaffGroups>
    ) { }

    async findUser(): Promise<Staff[]> {
        return this.staffRepository.find({ relations: ['positionID', 'divisionID'] });
    }

    async addUser(body: CombinedDto): Promise<Staff> {
        const position = await this.positionRepository.findOne({ where: { id: body.positionID } });

        if (!position) {
            throw new Error('Position not found');
        }

        const division = await this.divisionRepository.findOne({ where: { id: body.divisionID }, });

        if (!division) {
            throw new Error('Division not found');
        }

        // const staff = this.staffRepository.create({
        //     firstname: body.firstname,
        //     lastname: body.lastname,
        //     tabelNum: body.tabelNum,
        //     positionID: position,
        //     divisionID: division
        // });
        /// console.log(division)

        const staff: DeepPartial<Staff> = {
            firstname: body.firstname,
            lastname: body.lastname,
            tabelNum: body.tabelNum,
            positionID: { id: body.positionID } as Positions,
            divisionID: { id: body.divisionID } as Divisions
        };

        const newUser = this.staffRepository.create(staff)
        return await this.staffRepository.save(newUser);
    }

    async getDivision(): Promise<Divisions[]> {
        return await this.divisionRepository.find();
    }

    async createDivision(body: DivisionDto): Promise<{ message: string }> {
        try {
            const division = await this.divisionRepository.save(body);
            return { message: `Division "${division.division}" created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating division');
        }
    }

    async deleteDivision(id: number): Promise<{ message: string }> {
        const result = await this.divisionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Division wi ID ${id} not found`);
        }
        return { message: `Division with ID ${id} successfully deleted` };
    }

    async getPosition(): Promise<Positions[]> {
        return await this.positionRepository.find();
    }

    async createPosition(body: PositionDto): Promise<{ message: string }> {
        try {
            const position = await this.positionRepository.save(body);
            return { message: `Position "${position.position}" created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating position');
        }
    }

    async deletePosition(id: number): Promise<{ message: string }> {
        const result = await this.positionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Position wi ID ${id} not found`);
        }
        return { message: `Position with ID ${id} successfully deleted` };
    }

    async getStaffGroups(): Promise<StaffGroups[]> {
        return await this.staffGroupsRepository.find();
    }

    async createStaffGroups(body: StaffGroupsDto): Promise<{ message: string }> {
        try {
            const staffGroup = await this.staffGroupsRepository.save(body);
            return { message: `Staff group "${staffGroup.userGroup}" created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating position');
        }
    }

    async updateStaffGroups(id: number, body: UpdateStaffGroupsDto): Promise<{ message: string }> {
        const staffGroup = await this.staffGroupsRepository.findOne({ where: { id } });
        if (!staffGroup) {
            throw new NotFoundException(`Staff group with ID ${id} not found`);
        }
        await this.staffGroupsRepository.update(id, body);
        return { message: `Staff group with ID ${id} successfully updated` };
    }

    async deleteStaffGroups(id: number): Promise<{ message: string }> {
        const result = await this.staffGroupsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Staff group with ID ${id} not found`);
        }
        return { message: `Staff group with ID ${id} successfully deleted` };
    }
}