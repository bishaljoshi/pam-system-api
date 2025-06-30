import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(input: CreateAccountDto): Promise<Account> {
    const { accountName, email } = input;

    const account = new Account();
    account.accountName = accountName;
    account.email = email;

    try {
      await this.entityManager.save(Account, account);
      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<Account[]> {
    return this.entityManager.find(Account);
  }

  async findOne(id: number): Promise<Account | null> {
    return await this.entityManager.findOne(Account, {
      where: {
        id,
      },
    });
  }

  async update(id: number, input: UpdateAccountDto): Promise<Account> {
    const { accountName } = input;
    const account = await this.entityManager.findOne(Account, {
      where: {
        id,
      },
    });

    // check if account exist or not if not throw not found exception
    if (account == null) {
      throw new NotFoundException(`Account #${id} not found`);
    }

    if (accountName) {
      account.accountName = accountName;
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
