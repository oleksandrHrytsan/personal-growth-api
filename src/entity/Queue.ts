import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { Street } from './Street';
import { StreetQueue } from './StreetQueue';

@Entity('queues')
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsString()
  name: string;

  @OneToMany(() => Street, (street) => street.activeQueue)
  streets: Street[];

  @OneToMany(() => StreetQueue, (streetQueue) => streetQueue.queue)
  queues: Queue[];
}
