import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateIdPipe implements PipeTransform<string, number> {
    transform(value: string): number {
        const id = parseInt(value, 10);
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException('ID must be a positive integer');
        }
        return id;
    }
}
