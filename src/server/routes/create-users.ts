import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import 'reflect-metadata';

export const createUsers = express.Router();

createUsers.use(bodyParser.json());

createUsers.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const user: User = plainToClass(User, data);

    await validateOrReject(user, { validationError: { target: false } });

    await AppDataSource.manager.save(user);
    console.log(`DEBUG: User: ${user.firstName} created`);

    res.end();
  } catch (err) {
    res.sendStatus(400);
    throw err;
  }
});
