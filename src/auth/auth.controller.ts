import { Controller, Request, Post, UseGuards, Get, Body, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { IStaff } from './types/types';
import { Public } from 'common/decorators/public.decorator';
import { ChangePasswordDto } from './types/passwordDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: { user: IStaff }): Promise<{ accessToken: string, refreshToken: string }> {
    return await this.authService.login(req.user)
  }

  @Post('refresh')
  @Public()
  async refresh(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('changepassword')
  async changePassword(@Request() req: { user: IStaff }, @Body() body: ChangePasswordDto): Promise<{ message: string }> {
    const { id, login } = req.user;
    if (body.password === body.newPassword) {
      throw new BadRequestException('New password cannot be the same as the old password');
    }
    return await this.authService.changePassword(id, login, body);
  }
}
