import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for signing in a user.
 */
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
