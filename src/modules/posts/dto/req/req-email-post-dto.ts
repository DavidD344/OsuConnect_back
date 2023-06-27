import { IsEmail, IsNotEmpty } from "class-validator";

export class ReqEmailPostDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;


}
