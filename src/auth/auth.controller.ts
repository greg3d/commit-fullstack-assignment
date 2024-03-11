import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/signIn.dto';
import { NewUserDto } from '../dto/newUser.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  @Post('register')
  register(@Body() dto: NewUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user: Omit<User, 'password'> = await this.usersService.findOne(req.user.username);
    delete user['password'];
    return { profile: user };
  }
}
