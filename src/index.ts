import { AppDataSource } from './data-source';
import { app } from './server/server';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    await AppDataSource.initialize();

    app.listen(process.env.PORT);
  } catch (err) {
    console.error(err.message || err);
  }
}

main();
