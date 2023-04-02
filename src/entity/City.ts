import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsAlpha, IsString } from 'class-validator';
import { Street } from './Street';
import { Address } from './Address';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsString()
  @IsAlpha()
  name: string;

  @OneToMany(() => Street, (street) => street.city)
  streets: Street[];

  @OneToMany(() => Address, (Address) => Address.city)
  Addresses: Address[];
}