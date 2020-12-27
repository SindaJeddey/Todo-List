import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class UpdateCvDto{
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(18)
  @Max(55)
  age: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cin: number;

  @IsOptional()
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  path: string;
}