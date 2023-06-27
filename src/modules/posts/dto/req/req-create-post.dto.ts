import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ReqCreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;


  @IsBoolean()
  @IsNotEmpty()
  published: boolean;



}

