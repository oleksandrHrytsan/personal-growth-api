import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createNewUser, readUser } from './users.handlers';
import { logger } from '../../middlewares';

const createUser = express.Router();

createUser.use(bodyParser.json());

createUser.post('/user', async (request, response) => {
  try {
    const newUser = await createNewUser(request.body);

    response.json(newUser);
  } catch (error) {
    response.status(400).send(error.message);
    throw error;
  }
});

const getUser = express.Router();

getUser.use(bodyParser.json());

getUser.get('/user', async (request, response) => {
  try {
    const user = await readUser(request.body);

    logger.info('read user successful');

    response.json(user);
  } catch (error) {
    logger.error(error);

    response.status(400).send(error.message);

    throw error;
  }
});

const updateUser = express.Router();

updateUser.use(bodyParser.json());

updateUser.put('/user', async (request, response) => {
  try {
  } catch (error) {
    response.send(error.message);
    throw error;
  }
});

export { createUser, getUser };
