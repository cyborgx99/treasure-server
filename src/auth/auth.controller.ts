import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  GetMeResponse,
  LoginDto,
  LoginResponseDto,
  User,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() login: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(login);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getMe')
  async getMe(@Req() request: Request): Promise<GetMeResponse> {
    return { user: <User>request.user };
  }
}
