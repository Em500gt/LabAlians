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
  @ApiOperation({ summary: 'Staff authorization' })
  @ApiBody({
    schema: {
      example: {
        login: '...',
        password: '...'
      }
    }
  })
  @ApiResponse({ status: 200, schema: { example: { accessToken: '...', refreshToken: '...' } } })
  @ApiResponse({ status: 401, description: 'Login or password are incorrect!' })
  async login(@Request() req: { user: IStaff }): Promise<{ accessToken: string, refreshToken: string }> {
    return await this.authService.login(req.user)
  }

  @Post('refresh')
  @Public()
  @ApiOperation({ summary: 'Update access token' })
  @ApiBody({ schema: { example: { refreshToken: '...' } } })
  @ApiResponse({ status: 200, schema: { example: { accessToken: '...' } } })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('changepassword')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'New password cannot be the same as the old password' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect' })
  @ApiResponse({ status: 404, description: 'Staff account not found' })
  @ApiResponse({ status: 500, description: 'An error occurred while updating the password' })
  @ApiResponse({
    status: 500,
    description: `
    Possible errors:
    - An error occurred while processing the transaction
    - PASSWORD_SALT is not defined in the environment variables
    - PASSWORD_SALT is not a valid number
    `
  })
  async changePassword(@Request() req: { user: IStaff }, @Body() body: ChangePasswordDto): Promise<{ message: string }> {
    const { id, login } = req.user;
    if (body.password === body.newPassword) {
      throw new BadRequestException('New password cannot be the same as the old password');
    }
    return await this.authService.changePassword(id, login, body);
  }
}
