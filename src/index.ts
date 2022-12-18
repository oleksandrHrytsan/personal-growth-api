import { AppDataSource } from './data-source';
import { User } from './entity/User';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

const data = { firstName: 'Howard', lastName: 'Kleiner', age: 33 };

async function main() {
  try {
    await AppDataSource.initialize();

    console.log('Inserting a new user into the database...');
    const user: User = plainToClass(User, data);
    await validateOrReject(user);

    await AppDataSource.manager.save(user);
  } catch (err) {
    console.log(err);
  }
}

main();
