import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Queue } from './Queue';
import { Street } from './Street';

@Entity('street_queues')
export class StreetQueue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Queue, (queue) => queue.queues)
  queue: Queue;

  @ManyToOne(() => Street, (street) => street.streetQueues)
  street: Street;

  @Column()
  @IsString()
  schedule: string;
}
