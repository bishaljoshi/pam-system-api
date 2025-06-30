/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

/**
 * Controller for handling authentication-related requests.
 * This controller provides endpoints for signing in and signing up users.
 * It uses the AuthService to validate user credentials and generate JWT tokens.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * This endpoint is used to sign in a user
   * It validates the user credentials and returns a JWT token if valid
   * If the credentials are invalid, it returns an error message
   */
  @Post('signin')
  async login(@Body() body: SignInUserDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) return { message: 'Invalid credentials' };
    return this.authService.login(user);
  }

  /**
   * This endpoint is used to sign up a new user
   * @param body - The user credentials for signing up
   * @returns A message indicating the result of the sign-up operation
   * @throws {Error} If the credentials are invalid
   */
  @Post('signup')
  async signup(@Body() body: SignUpUserDto) {
    if (body.username == null || body.password == null) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.signup(body);
  }
}
