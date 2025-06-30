import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationQueryDto } from 'src/config/pagination.dto';

// This controller handles payment-related operations such as creating, retrieving, updating, and deleting payments.
// It uses JWT authentication to secure the endpoints, ensuring that only authenticated users can access them.
// This controller provides endpoints for managing payments.
// It includes methods for creating a payment, retrieving all payments with pagination,
// retrieving a specific payment by ID, updating a payment, and deleting a payment by ID.
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // This method creates a new payment
  // It accepts a CreatePaymentDto object in the request body
  // The CreatePaymentDto is validated to ensure it meets the required structure
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  // This method retrieves all payments with pagination support
  // The PaginationQueryDto is used to validate the query parameters
  // It returns a paginated list of payments based on the provided page and limit
  // The page and limit parameters are extracted from the query object
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return this.paymentService.findAll(page, limit);
  }

  // This method retrieves a specific payment by its ID
  // The ID is validated using ParseIntPipe to ensure it is an integer
  // It returns the payment details for the specified ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  // This method updates an existing payment by its ID
  // The ID is validated using ParseIntPipe to ensure it is an integer
  // It accepts an UpdatePaymentDto object in the request body
  // It returns the updated payment details
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  // This method deletes a payment by its ID
  // The ID is validated using ParseIntPipe to ensure it is an integer
  // It returns a confirmation of the deletion
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.remove(id);
  }
}
