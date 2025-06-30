import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Represents a user entity in the database.
 * This entity is used for user authentication and management.
 * It contains fields for the user's ID, username, and password.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;
}
