import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createNewAddress } from './addresses.handlers';

export const createAddress = express.Router();

createAddress.use(bodyParser.json());

createAddress.post('/address', async (request, response) => {
  try {
    const newAddressId = await createNewAddress(request.body);

    response.json(newAddressId);
    // response.sendStatus(201);
  } catch (error) {
    response.sendStatus(400);
    response.send(error.message);
    throw error;
  }
});
