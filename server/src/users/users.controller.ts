import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

  constructor(private readonly service: UsersService) {
  }

  @Get()
  getAll() {
    return "users";
  }

  @Get(':username')
  getUser(@Param('username') username: string) : Promise<User> {
    return this.service.findOne(username);
  }
}
