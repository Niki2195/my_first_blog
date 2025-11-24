import { IsInt, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetItemsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
