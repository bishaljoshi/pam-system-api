import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/config/pagination.dto';

// This controller manages account-related operations
// It uses the AccountService to handle business logic
// It is protected by JWT authentication
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // This method creates a new account
  // It accepts a CreateAccountDto object in the request body
  // The CreateAccountDto is validated to ensure it meets the required structure
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  // This method retrieves all accounts with pagination support
  // The PaginationQueryDto is used to validate the query parameters
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return this.accountService.findAll(page, limit);
  }

  // This method retrieves a specific account by its ID
  // The ID is validated using ParseIntPipe to ensure it is an integer
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id);
  }

  // This method updates an existing account by its ID
  // The ID is validated using ParseIntPipe to ensure it is an integer
  // It accepts an UpdateAccountDto object in the request body
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(id, updateAccountDto);
  }
}
