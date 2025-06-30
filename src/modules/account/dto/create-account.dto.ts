import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';

// This DTO is used to validate the data when creating a new account
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
