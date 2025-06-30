import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

// This module is responsible for managing accounts
// It imports the AccountController and AccountService
// The AccountController handles incoming requests related to accounts
// The AccountService contains the business logic for account operations
@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
