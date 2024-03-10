import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly service: UsersService) {
  }

  @Get('current')
  getCurrentUser(@Req() request: Request) {
    if (request.headers.has('uname')) {
      return this.service.findOne(request.headers.get('uname'));
    }
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.service.findOne(username);
  }
}
