import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validateOrReject, IsNotEmpty, IsString, IsNumber } from 'class-validator';

class ValidData {
  constructor(host, port, name, user, password) {
    this.host = host;
    this.port = port;
    this.name = name;
    this.user = user;
    this.password = password;
  }

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

async function validator() {
  try {
    const env = plainToClass(ValidData, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await validateOrReject(env, { validationError: { target: false } });
    console.log('DEBUG: Validation successful');
  } catch (err) {
    console.error(err.message || err);
  }
}

validator();
