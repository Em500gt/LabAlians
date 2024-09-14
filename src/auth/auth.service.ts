import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { StaffService } from 'modules/staff/services/staff.service';
import { JwtService } from '@nestjs/jwt';
import { IStaff } from './types/types';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './types/passwordDTO';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateStaff(login: string, password: string): Promise<IStaff | null> {
    const staff = await this.staffService.findOne(login);
    if (!staff) {
      throw new UnauthorizedException('Login or password are incorrect!');
    }
    const passwordIsMatch = await bcrypt.compare(password, staff.password);
    if (!passwordIsMatch) {
      throw new UnauthorizedException('Login or password are incorrect!');
    }
    return staff;
  }

  async login(staff: IStaff): Promise<{ accessToken: string, refreshToken: string }> {
    const staffGroup = await this.staffService.findStaffGroup(staff.login)
    const payload = { id: staff.id, login: staff.login, staffGroup: staffGroup.staffGroup };
    const accessToken = this.jwtService.sign(payload, { expiresIn: this.configService.getOrThrow('TIME_ACCESS_TOKEN') });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.configService.getOrThrow('TIME_REFRESH_TOKEN') });
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const staffGroup = await this.staffService.findStaffGroup(payload.login);
      const newAccessToken = this.jwtService.sign(
        { id: payload.id, login: payload.login, staffGroup: staffGroup.staffGroup },
        { expiresIn: this.configService.getOrThrow('TIME_ACCESS_TOKEN') }
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async changePassword(id: number, login: string, updatePasswordStaff: ChangePasswordDto): Promise<{ message: string }> {
    const staff = await this.staffService.findOne(login);
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    const passwordIsMatch = await bcrypt.compare(updatePasswordStaff.password, staff.password);
    if (!passwordIsMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    return await this.staffService.updatePassword(id, updatePasswordStaff.newPassword);
  }
}