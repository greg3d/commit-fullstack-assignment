import { Body, Controller, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/signIn.dto';
import { NewUserDto } from '../dto/newUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() dto: NewUserDto) {
    return this.authService.register(dto);
  }
}
