import { Module } from '@nestjs/common';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

// This module is responsible for managing payments in the system.
// It includes the PaymentController for handling HTTP requests related to payments
// and the PaymentService for business logic related to payments.
@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
