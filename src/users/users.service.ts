import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
  }

  async findOne(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(`User with username ${username} not found!`)
    return user;
  }

}