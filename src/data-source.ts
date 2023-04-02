import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { City } from './entity/City';
import { Queue } from './entity/Queue';
import { Street } from './entity/Street';
import { StreetQueue } from './entity/StreetQueue';
import { User } from './entity/User';
import { Address } from './entity/Address';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [City, Queue, Street, StreetQueue, User, Address],
  migrations: [],
  subscribers: [],

  namingStrategy: new SnakeNamingStrategy(),
});
