import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

// This DTO is used to validate the data when updating an existing account
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
