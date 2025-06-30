import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @Length(2, 100)
  accountName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
