/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { JWT_ACCESS_SECRET } from 'src/config/constants';
import { SignUpUserDto } from './dto/signup-user.dto';

export interface JwtPayload {
  id: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user by checking their username and password.
   * @param username - The username of the user.
   * @param pass - The password of the user.
   * @returns A partial user object without the password if validation is successful, otherwise null.
   */
  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.entityManager.findOne(User, {
      where: {
        username,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * Generates a JWT token for the user.
   * @param user - The user object containing id and username.
   * @returns An object containing the generated access token.
   */
  login(user: Partial<User>) {
    if (!user || !user.id || !user.username) {
      throw new Error('Invalid user data');
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '6h',
      secret: JWT_ACCESS_SECRET,
    });

    return { accessToken };
  }

  /**
   * Signs up a new user by creating a new user record in the database.
   * @param input - The sign-up data containing username and password.
   * @returns The created user object.
   */
  async signup(input: SignUpUserDto): Promise<User> {
    const { username, password } = input;

    const existingUser = await this.entityManager.findOne(User, {
      where: { username },
    });
    if (existingUser) {
      throw new Error('Username already exists');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.password = String(hashedPassword);

    try {
      await this.entityManager.save(User, user);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating user');
    }
  }
}
