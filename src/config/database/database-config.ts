import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  entities: ['dist/modules/**/**/*.entity.{ts,js}'],
  migrations: ['dist/config/database/migrations/*.{ts,js}'],
};
