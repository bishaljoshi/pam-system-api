import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Like } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

// This service is responsible for managing payments in the system.
// It uses the EntityManager from TypeORM to interact with the database
// It provides methods to create, findAll, find, update and remove payments
@Injectable()
export class PaymentService {
  constructor(private readonly entityManager: EntityManager) {}

  // This method creates a new payment
  // It accepts a CreatePaymentDto object as input
  // It returns the created Payment object
  async create(input: CreatePaymentDto): Promise<Payment> {
    const { account_id, amount, payment_date, payment_method } = input;

    const payment = new Payment();
    payment.accountId = account_id;
    payment.amount = amount;
    if (payment_date) {
      payment.paymentDate = new Date(payment_date);
    }
    payment.paymentMethod = payment_method || '';

    try {
      await this.entityManager.save(Payment, payment);
      return payment;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // This method retrieves all payments with pagination support
  // It accepts page and limit parameters to control the pagination
  // It returns an object containing the data, total count, current page, and last page
  async findAll(page = 1, limit = 10, search = ''): Promise<any> {
    const [data, total] = await this.entityManager.findAndCount(Payment, {
      relations: ['account'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      where: search
        ? [{ account: { accountName: Like(`%${search}%`) } }]
        : undefined,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // This method retrieves a specific payment by its ID
  // It accepts an ID as input and returns the Payment object or null if not found
  async findOne(id: number): Promise<Payment | null> {
    return await this.entityManager.findOne(Payment, {
      where: {
        id,
      },
    });
  }

  // This method updates an existing payment by its ID
  // It accepts an ID and an UpdatePaymentDto object as input
  // It returns the updated Payment object
  async update(id: number, input: UpdatePaymentDto): Promise<Payment> {
    const { account_id, amount, payment_date, payment_method } = input;
    const payment = await this.entityManager.findOne(Payment, {
      where: {
        id,
      },
    });

    // check if payment exist or not if not throw not found exception
    if (payment == null) {
      throw new NotFoundException(`Payment #${id} not found`);
    }

    if (account_id) {
      payment.accountId = account_id;
    }
    if (amount) {
      payment.amount = amount;
    }
    if (payment_date) {
      payment.paymentDate = new Date(payment_date);
    }
    if (payment_method) {
      payment.paymentMethod = payment_method;
    }

    try {
      await this.entityManager.save(Payment, payment);
      return payment;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // This method removes a payment by its ID
  // It accepts an ID as input and deletes the corresponding payment
  // If the payment is not found, it throws a NotFoundException
  async remove(id: number): Promise<void> {
    const payment = await this.entityManager.findOne(Payment, {
      where: {
        id,
      },
    });

    // check if account exist or not if not throw not found exception
    if (payment == null) {
      throw new NotFoundException();
    }

    const result = await this.entityManager.delete(Payment, id);

    if (result.affected === 0) {
      throw new NotFoundException(`Payment #${id} not found`);
    }
  }
}
