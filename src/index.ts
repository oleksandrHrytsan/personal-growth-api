import * as dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './data-source';
import 'reflect-metadata';
import { app } from './server';

async function main() {
  try {
    await AppDataSource.initialize();

    app.listen(process.env.PORT);
  } catch (err) {
    console.error(err.message || err);
  }
}

main();
