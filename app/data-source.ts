import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./src/entities/Book";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 13306,
  username: "docker",
  password: "docker",
  database: "example_db",
  synchronize: true,
  logging: false,
  entities: [Book],
  migrations: ["./src/migrations/*.ts"],
  subscribers: [],
});
