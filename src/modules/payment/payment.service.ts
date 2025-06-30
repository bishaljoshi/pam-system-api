import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly entityManager: EntityManager) {}

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

  findAll(): Promise<Payment[]> {
    return this.entityManager.find(Payment);
  }

  async findOne(id: number): Promise<Payment | null> {
    return await this.entityManager.findOne(Payment, {
      where: {
        id,
      },
    });
  }

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
