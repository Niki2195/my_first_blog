import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Item } from "./entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>
  ) {}

  async findAll(limit = 50, offset = 0) {
    // простая пагинация limit/offset
    const [items, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { id: "ASC" },
    });
    return { items, count };
  }
}
