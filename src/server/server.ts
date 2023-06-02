import * as express from 'express';
import { createUser } from './app/users';
import { getUser } from './app/users';
import { createAddress } from './app/addresses';

export const app = express();

app.use(createUser, createAddress, getUser);
