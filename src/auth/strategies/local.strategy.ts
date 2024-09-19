import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { IStaff } from 'auth/types/types';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({ usernameField: 'login' });
    }

    async validate(login: string, password: string): Promise<IStaff> {
        const staff = await this.authService.validateStaff(login, password);
        if (!staff) {
            throw new UnauthorizedException('Login or password are incorrect!');
        }
        return staff;
    }
}