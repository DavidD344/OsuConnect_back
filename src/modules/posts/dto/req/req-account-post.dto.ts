import { IsNotEmpty, IsString } from "class-validator";

export class ReqAccountPostDto {
  @IsString()
  @IsNotEmpty()

  account: string;

}
