import * as dotenv from 'dotenv'
dotenv.config()
import "reflect-metadata"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from "typeorm"
import { User } from "./entity/User"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER
    password: process.env.DB_PASS
    database: process.env.DB_NAME
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],

    namingStrategy: new SnakeNamingStrategy(),
})