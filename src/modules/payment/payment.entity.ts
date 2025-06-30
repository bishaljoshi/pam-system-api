import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from './../account/account.entity';

// This entity represents a payment in the system
// It includes fields for the payment amount, method, date, and associated account
@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    name: 'payment_method',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  paymentMethod: string;

  @CreateDateColumn({ name: 'payment_date', type: 'timestamp' })
  paymentDate: Date;

  @Column({ name: 'account_id' })
  accountId: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Account, (account) => account.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
