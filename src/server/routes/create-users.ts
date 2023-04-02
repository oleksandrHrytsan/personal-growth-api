import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import 'reflect-metadata';

const userRepository = AppDataSource.getRepository(User);

export const createUsers = express.Router();

createUsers.use(bodyParser.json());

createUsers.post('/create', async (req, res) => {
  try {
    const user: User = plainToClass(User, req.body);

    await validateOrReject(user, { validationError: { target: false } });

    await userRepository.save(user);

    res.sendStatus(201).end();
  } catch (err) {
    res.sendStatus(400).send(err.message);
    throw err;
  }
});
