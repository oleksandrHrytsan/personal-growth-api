import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from '../../data-source';

const createUsers = express.Router();

createUsers.use(bodyParser.json());

createUsers.post('/create', async (req, res) => {});
