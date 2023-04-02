import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { Address } from './Address';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar')
  @IsString()
  phoneNumber: string;

  @Column('varchar')
  @IsString()
  password: number;

  @ManyToMany(() => Address, (address) => address.users)
  @JoinTable()
  addresses: Address[];
}
