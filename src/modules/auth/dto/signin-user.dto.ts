import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
