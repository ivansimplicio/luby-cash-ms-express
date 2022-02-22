import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Address from './Address';

@Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'cpf_number' })
  cpfNumber: string;

  @Column({ name: 'average_salary' })
  averageSalary: number;

  @Column({ name: 'current_balance' })
  currentBalance: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
