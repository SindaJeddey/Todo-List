import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserSubscribeDto{
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string
}