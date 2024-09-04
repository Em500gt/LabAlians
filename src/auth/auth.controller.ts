import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { IStaff } from './types/types';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
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
}
