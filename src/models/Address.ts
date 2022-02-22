import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export default class Address {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipcode: string;
}
