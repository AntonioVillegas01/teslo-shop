import { IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type( () => Number) //enable implicitConversions : true
  limit?: number

  @IsOptional()
  @Min(0)
  @Type( () => Number) //enable implicitConversions : true
  offset?:number

}
