import { DataSource } from "typeorm";
import { config } from "./ormconfig"; // относительный путь к ormconfig.ts
import { Item } from "./items/entities/item.entity";

const dataSource = new DataSource(config);

async function seed() {
  await dataSource.initialize();

  const repo = dataSource.getRepository(Item);

  for (let i = 1; i <= 50000; i++) {
    const item = repo.create({ name: `Item ${i}` });
    await repo.save(item);
  }

  console.log("Seeding finished");
  await dataSource.destroy();
}

seed();
