import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// export type User = any;
interface UserDto {
  username: string;
  phone: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(user: UserDto): Promise<User | undefined> {
    return this.usersRepository.create(user);
  }
}