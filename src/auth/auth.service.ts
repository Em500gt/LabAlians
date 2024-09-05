import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffService } from 'modules/staff/services/staff.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IStaff } from './types/types';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService
  ) { }

  async validateStaff(login: string, password: string): Promise<IStaff | null> {
    const staff = await this.staffService.findOne(login);

    const passwordIsMatch = await bcrypt.compare(password, staff.password)
    if (staff && passwordIsMatch) {
      return staff;
    }
    throw new UnauthorizedException('Login or password are incorrect!');
  }

  async login(staff: IStaff): Promise<{ token: string }> {
    const staffGroup = await this.staffService.findStaffGroup(staff.login)

    return {
      token: this.jwtService.sign({ id: staff.id, login: staff.login, staffGroup: staffGroup.staffGroup })
    }
  }
}