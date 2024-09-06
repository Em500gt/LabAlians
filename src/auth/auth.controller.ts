import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { IStaff } from './types/types';
import { Public } from 'common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: { user: IStaff }) {
    return this.authService.login(req.user)
  }

  @Post('refresh')
  @Public()
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
