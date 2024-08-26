import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
    constructor(private configService: ConfigService) { }

    private getSaltRounds(): number {
        const saltRoundsStr = this.configService.get<string>('PASSWORD_SALT');
        if (!saltRoundsStr) {
            throw new BadRequestException('PASSWORD_SALT is not defined in the environment variables');
        }

        const saltRounds = parseInt(saltRoundsStr, 10);
        if (isNaN(saltRounds)) {
            throw new BadRequestException('PASSWORD_SALT is not a valid number');
        }

        return saltRounds;
    }

    async transform(value: any): Promise<any> {
        if (!value.password) {
            return value;
        }

        if (typeof value.password !== 'string') {
            throw new BadRequestException('Password must be a string');
        }

        const saltRounds = this.getSaltRounds();
        value.password = await bcrypt.hash(value.password, saltRounds);
        return value;
    }
}
