import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
