import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

// This service manages account-related operations
// It uses the EntityManager from TypeORM to interact with the database
// It provides methods to create, findAll, find, and update accounts
@Injectable()
export class AccountService {
  constructor(private readonly entityManager: EntityManager) {}

  // This method creates a new account
  // It accepts a CreateAccountDto object as input
  // It returns the created Account object
  async create(input: CreateAccountDto): Promise<Account> {
    const { accountName, email, balance } = input;

    const account = new Account();
    account.accountName = accountName;
    account.email = email;
    account.balance = balance;

    try {
      await this.entityManager.save(Account, account);
      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // This method retrieves all accounts with pagination support
  // It accepts page and limit parameters to control the pagination
  // It returns an object containing the data, total count, current page, and last page
  async findAll(page = 1, limit = 10): Promise<any> {
    const [data, total] = await this.entityManager.findAndCount(Account, {
      relations: ['payments'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // This method retrieves a specific account by its ID
  // It accepts an ID as input and returns the Account object or null if not found
  async findOne(id: number): Promise<Account | null> {
    return await this.entityManager.findOne(Account, {
      relations: ['payments'],
      where: {
        id,
      },
    });
  }

  // This method updates an existing account by its ID
  // It accepts an ID and an UpdateAccountDto object as input
  // It returns the updated Account object or throws an exception if not found
  async update(id: number, input: UpdateAccountDto): Promise<Account> {
    const { accountName, balance } = input;
    const account = await this.entityManager.findOne(Account, {
      where: {
        id,
      },
    });

    // check if account exist or not if not throw not found exception
    if (account == null) {
      throw new NotFoundException(`Account #${id} not found`);
    }

    if (typeof accountName === 'string' && accountName.trim() !== '') {
      account.accountName = accountName;
    }

    if (typeof balance === 'number' && !isNaN(balance)) {
      account.balance = balance;
    }

    try {
      await this.entityManager.save(Account, account);
      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
