import { Column } from "typeorm";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class NewCvDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(18)
  @Max(55)
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cin: number;

  @IsNotEmpty()
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  path: string;
}