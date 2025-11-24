import { Controller, Get, Query } from "@nestjs/common";
import { Repository } from "typeorm";
import { Item } from "./entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Controller("items")
export class ItemsController {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>
  ) {}

  @Get()
  async getItems(@Query("skip") skip = 0, @Query("take") take = 100) {
    const [items, count] = await this.itemsRepository.findAndCount({
      skip: Number(skip),
      take: Number(take),
    });
    return { items, count };
  }
}
