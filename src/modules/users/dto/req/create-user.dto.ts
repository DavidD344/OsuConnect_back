import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {


  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  account: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  // @IsOptional()
  // @IsBoolean()
  // role: string;


}
