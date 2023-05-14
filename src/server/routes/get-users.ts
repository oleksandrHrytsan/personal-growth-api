import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from '../../data-source';
import 'reflect-metadata';
import { User } from '../../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const getUsers = express.Router();

getUsers.use(bodyParser.json());

getUsers.get('/getUsers', async (request, response) => {
  try {
    const { id } = request.body;

    const user = await userRepository
      .createQueryBuilder('user')
      .leftJoin('user.addresses', 'address')
      .leftJoin('address.city', 'city')
      .leftJoin('address.street', 'street')
      .select([
        'user.id',
        'user.email',
        'user.phoneNumber',
        'user.password',
        'city.name',
        'street.name',
        'address.buildingNumber',
      ])
      .where('user.id = :userId', { userId: id })
      .getOne();

    console.log(user);

    response.send(JSON.stringify(user));
  } catch (error) {
    response.send(error.message);
    throw error;
  }
});
