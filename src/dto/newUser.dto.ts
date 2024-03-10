export interface NewUserDto extends Record<string, string> {
  username: string;
  phone: string;
  password: string;
}