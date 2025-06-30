/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @Length(2, 100)
  accountName: string;

  @IsEmail()
  email: string;
}
