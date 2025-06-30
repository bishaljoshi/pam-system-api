/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() body: SignInUserDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) return { message: 'Invalid credentials' };
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() body: SignUpUserDto) {
    if (body.username == null || body.password == null) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.signup(body);
  }
}
