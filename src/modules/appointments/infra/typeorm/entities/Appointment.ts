// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import User from './User';
import User from '@modules/users/infra/typeorm/entities/User';

interface AppointmentConstructorDTO {
  provider: string;
  date: Date;
}

// decorators
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // indicamos que propiedade abaixo pertence a uma  coluna
  id: string;

  @Column()
  // provider: string;
  provider_id: string;

  @ManyToOne(() => User) // passa a model a ser usada
  @JoinColumn({ name: 'provider_id' }) // campo que esta relacionado
  provider: User;

  @Column()
  // provider: string;
  user_id: string;

  @ManyToOne(() => User) // passa a model a ser usada
  @JoinColumn({ name: 'user_id' }) // campo que esta relacionado
  user: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
