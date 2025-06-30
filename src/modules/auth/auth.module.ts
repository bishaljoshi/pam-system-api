import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { JWT_ACCESS_SECRET, JWT_EXPIRES_IN } from './../../config/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

/**
 * This module handles user authentication using JWT
 * It provides endpoints for signing in and signing up users
 * It uses Passport for authentication and JWT for token generation
 */
@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
