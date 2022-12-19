import * as express from 'express';
import { createUsers } from './routes/create-users';

export const app = express();

app.use(createUsers);
