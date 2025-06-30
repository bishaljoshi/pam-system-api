/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_SECRET } from '../../config/constants';

/**
 * JWT Strategy for Passport.js
 * This strategy extracts the JWT from the Authorization header
 * and validates it using the secret key.
 * It extracts the user ID and username from the JWT payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_ACCESS_SECRET,
    });
  }

  validate(payload: any) {
    return { userId: payload?.sub, username: payload?.username };
  }
}
