import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { City } from './City';
import { Street } from './Street';
import { User } from './User';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => City, (city) => city.Addresses)
  city: City;

  @ManyToOne(() => Street, (street) => street.Addresses)
  street: Street;

  @Column('text')
  @IsString()
  buildingNumber: string;

  @ManyToMany(() => User, (user) => user.addresses)
  users: User[];
}
