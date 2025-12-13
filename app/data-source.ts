import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '13306'),
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_NAME || 'example_db',
  synchronize: false,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});
