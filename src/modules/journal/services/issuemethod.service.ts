import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IssueMethod } from "../entities/issue.method.entity";
import { Repository } from "typeorm";
import { IssueMethodDto } from "../dto/issue.method.dto";

@Injectable()
export class IssueMethodService {
    constructor(
        @InjectRepository(IssueMethod)
        private readonly issueMethodRepository: Repository<IssueMethod>
    ) { }

    async getIssueMethod(): Promise<IssueMethod[]> {
        return await this.issueMethodRepository.find();
    }

    async createIssueMethod(body: IssueMethodDto): Promise<{ message: string }> {
        const issueMethodFind = await this.issueMethodRepository.findOne({ where: { method: body.method } })
        if (issueMethodFind) {
            throw new BadRequestException('Issue method already exists');
        }
        try {
            const issueMethod = await this.issueMethodRepository.save(body);
            return { message: `Issue method ${issueMethod.method} created successfully` };
        } catch (error) {
            throw new BadRequestException('Error creating issue method');
        }
    }

    async deleteIssueMethod(id: number): Promise<{ message: string }> {
        try {
            const result = await this.issueMethodRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Issue method with id ${id} not found`);
            }
            return { message: `Issue method with ID ${id} successfully deleted` };
        } catch (error) {
            if (error.code === '23503') {
                throw new BadRequestException(`Cannot delete issue method with ID ${id}, as it is still referenced by other entities`);
            }
            throw new InternalServerErrorException(`Error deleting position: ${error.message}`);
        }
    }

}