import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Payment } from './../payment/payment.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'account_name', type: 'varchar', length: 100 })
  accountName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Payment, (payment) => payment.account)
  payments: Payment[];
}
