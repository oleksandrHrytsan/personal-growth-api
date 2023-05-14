import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { validateOrReject } from 'class-validator';
import 'reflect-metadata';
import { Address } from '../../entity/Address';

const userRepository = AppDataSource.getRepository(User);
const addressRepository = AppDataSource.getRepository(Address);

export const createUsers = express.Router();

createUsers.use(bodyParser.json());

createUsers.post('/createUsers', async (request, response) => {
  try {
    const { email, phoneNumber, password, city, street, buildingNumber } = request.body;

    const userAddressId = await addressRepository
      .createQueryBuilder('address')
      .leftJoinAndSelect('address.city', 'city')
      .leftJoinAndSelect('address.street', 'street')
      .select('address.id')
      .where(
        'city.name = :cityName AND street.name = :streetName AND address.buildingNumber = :buildingNumber',
        { cityName: city, streetName: street, buildingNumber: buildingNumber },
      )
      .getOne();

    const newUser = new User();

    const newUserAddress = await addressRepository.findOneBy({ id: userAddressId.id });

    newUser.email = email;
    newUser.phoneNumber = phoneNumber;
    newUser.password = password;
    newUser.addresses = [newUserAddress];

    await validateOrReject(newUser, { validationError: { target: false } });

    await userRepository.save(newUser);

    // response.send(JSON.stringify(user));
    response.end();
  } catch (error) {
    response.send(error.message);
    throw error;
  }
});
