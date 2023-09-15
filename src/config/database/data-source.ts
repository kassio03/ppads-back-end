import { DataSource } from 'typeorm';
import { databaseConfig } from './database-config';

export const DbDataSource = new DataSource({
  ...databaseConfig,
  entities: ['src/modules/**/**/*.entity.{ts,js}'],
  migrations: ['src/config/database/migrations/*.{ts,js}'],
});
