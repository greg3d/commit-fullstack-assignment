import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from '../dto/newUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

const ROUNDS = 8;

class UserAlreadyExists extends HttpException {
  constructor(username: string) {
    super(`${username} already exists!`, 409);
  }

}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username });
    const hash = await bcrypt.hash(pass, ROUNDS);
    if (user?.password !== hash) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    // TODO: GENERATE JWT here and return it
    return result;
  }

  async register(dto: NewUserDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username: dto.username });
    if (user) throw new UserAlreadyExists(dto.username);
    dto.password = await bcrypt.hash(dto.password, ROUNDS);
    return this.usersRepository.create(dto);
  }
}

