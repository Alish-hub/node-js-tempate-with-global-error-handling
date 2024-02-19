import { DataSource } from "typeorm";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   url: process.env.URL,
  synchronize: true,
  logging: true,
  entities: [join(__dirname, "../api/entities/*.entity.ts")],
});
export { datasource };
