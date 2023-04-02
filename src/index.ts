import { AppDataSource } from './data-source';
import { User } from './entity/User';
import { Address } from './entity/Address';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { City } from './entity/City';
import { Street } from './entity/Street';

const inputData = {
  email: '1@gmail.com',
  phoneNumber: '+380-11-111-11-11',
  password: '1111',
  city: 'Cherkasy',
  street: 'Hoholya',
  buildingNumber: '34/1',
};

async function main() {
  try {
    await AppDataSource.initialize();

    const { email, phoneNumber, password, city, street, buildingNumber } = inputData;

    const userRepo = AppDataSource.getRepository(User);
    const addressRepo = AppDataSource.getRepository(Address);
    const cityRepo = AppDataSource.getRepository(City);
    const streetRepo = AppDataSource.getRepository(Street);

    // const userAddress: Address = plainToClass(Address, newAddress);

    // const user: User = plainToClass(User, newUser);
    // await validateOrReject(user);
    // await userRepo.save

    // await validateOrReject(userAddress);

    // await userAddressRepository.save(userAddress);
  } catch (err) {
    console.log(err);
  }
}

main();
