import * as express from 'express';
import { createUsers } from './routes/create-users';
import { getUsers } from './routes/get-users';
import { createAddress } from './routes/create-address';
export const app = express();

app.use(createUsers, createAddress, getUsers);
