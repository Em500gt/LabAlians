import { Controller, Request, Post, UseGuards, Get, Body, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { IStaff } from './types/types';
import { Public } from 'common/decorators/public.decorator';
import { ChangePasswordDto } from './types/passwordDTO';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({
    description: 'Данные для входа', schema: {
      example: {
        login: '...',
        password: '...'
      }
    }
  })
  @ApiResponse({ status: 200, schema: { example: { accessToken: '...', refreshToken: '...' } } })
  @ApiResponse({ status: 401, description: 'Неверный логин или пароль' })
  async login(@Request() req: { user: IStaff }): Promise<{ accessToken: string, refreshToken: string }> {
    return await this.authService.login(req.user)
  }

  @Post('refresh')
  @Public()
  @ApiOperation({ summary: 'Обновление токена' })
  @ApiBody({ description: 'Токен обновления', schema: { example: { refreshToken: '...' } } })
  @ApiResponse({ status: 200, schema: { example: { accessToken: '...' } } })
  @ApiResponse({ status: 401, description: 'Недействительный токен обновления' })
  async refresh(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('changepassword')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Смена пароля пользователя' })
  @ApiBody({ description: 'Данные для смены пароля', type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Пароль успешно изменен' })
  @ApiResponse({ status: 400, description: 'Новый пароль не может быть таким же, как старый' })
  @ApiResponse({ status: 401, description: 'Текущий пароль неверен' })
  async changePassword(@Request() req: { user: IStaff }, @Body() body: ChangePasswordDto): Promise<{ message: string }> {
    const { id, login } = req.user;
    if (body.password === body.newPassword) {
      throw new BadRequestException('New password cannot be the same as the old password');
    }
    return await this.authService.changePassword(id, login, body);
  }
}
