import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // The root endpoint of the application
  // This method returns a simple greeting message
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
