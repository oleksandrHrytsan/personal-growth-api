import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Unique } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { Address } from './Address';

@Entity('users')
@Unique(['email', 'phoneNumber', 'password'])
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
  password: string;

  @ManyToMany(() => Address, (address) => address.users, { cascade: true })
  @JoinTable()
  addresses: Address[];
}
