import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from '../dto/newUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

const ROUNDS = 8;

class UserAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(`User with username '${username}' already exists!`, 409);
  }
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  private async generateToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username });
    // const hash = await bcrypt.hash(pass, ROUNDS);
    if (!user) throw new NotFoundException();
    if (bcrypt.compareSync(user.password, pass)) {
        throw new UnauthorizedException();
    }
    return {
      username: user.username,
      access_token: await this.generateToken(user)
    };
  }

  async register(dto: NewUserDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username: dto.username });
    if (user) throw new UserAlreadyExistsException(dto.username);
    dto.password = await bcrypt.hash(dto.password, ROUNDS);
    let newUser = this.usersRepository.create(dto);
    newUser = await this.usersRepository.save(newUser);

    return {
      username: newUser.username,
      token: await this.generateToken(newUser)
    };

  }
}