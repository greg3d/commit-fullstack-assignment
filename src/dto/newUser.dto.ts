import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class NewUserDto implements Record<string, any> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  phone: string;

  @IsStrongPassword()
  password: string;
}