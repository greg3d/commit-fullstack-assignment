import { IsNotEmpty } from 'class-validator';

export class NewUserDto implements Record<string, any> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}