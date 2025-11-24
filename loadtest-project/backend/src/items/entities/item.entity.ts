import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";

@Entity({ name: "items" })
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  @Index() // индекс на name — можно убрать, но для поиска полезно
  name!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  @Index() // индекс на created_at для сортировки/фильтрации
  created_at!: Date;
}
