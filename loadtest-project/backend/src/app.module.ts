import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./ormconfig"; // относительный путь к ormconfig.ts
import { ItemsModule } from "./items/items.module";

@Module({
  imports: [TypeOrmModule.forRoot(config), ItemsModule],
})
export class AppModule {}
