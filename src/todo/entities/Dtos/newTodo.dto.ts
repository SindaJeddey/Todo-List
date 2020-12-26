import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class NewTodoDto{

  @IsString()
  @IsNotEmpty()
  @MinLength(6,{
    message: "Name must have at least 6 characters"
  })
  @MaxLength(25,{
    message: "Name must have at most 25 characters"
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}