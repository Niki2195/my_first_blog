import { DataSourceOptions } from "typeorm";
import { Item } from "./items/entities/item.entity"; // путь относительно ormconfig.ts

export const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "postgres",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "itemsdb",
  entities: [Item],
  synchronize: true,
  logging: false,
  extra: { max: 20 },
};
