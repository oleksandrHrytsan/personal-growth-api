import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from './City';
import { IsString } from 'class-validator';
import { Queue } from './Queue';
import { StreetQueue } from './StreetQueue';
import { Address } from './Address';

@Entity('streets')
export class Street {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsString()
  name: string;

  @ManyToOne(() => Queue, (queue) => queue.streets)
  activeQueue: Queue;

  @ManyToOne(() => City, (city) => city.streets)
  city: City;

  @OneToMany(() => StreetQueue, (streetQueue) => streetQueue.street)
  streetQueues: StreetQueue[];

  @OneToMany(() => Address, (Address) => Address.street)
  Addresses: Address[];
}
