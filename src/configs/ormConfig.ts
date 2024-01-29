import { DataSource } from "typeorm";
import { join } from "path";
const datasource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  //   url: process.env.URL,
  synchronize: true,
  //   logging: true,
  entities: [join(__dirname, "../api/entities/*.entity.ts")],
});
export { datasource };
