import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
// interface AppointmentConstructorDTO {
//   provider: string;
//   date: Date;
// }

// KISS - Keep It Simple & Stupid

// decorators
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid') // indicamos que propiedade abaixo pertence a uma  coluna
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude() // nao envia o campo para o front end
  password: string;

  @Column()
  avatar: string;

  // @Column('time with time zone')
  // date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  get getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
