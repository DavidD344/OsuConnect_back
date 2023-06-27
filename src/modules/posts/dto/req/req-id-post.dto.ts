import { IsNotEmpty, IsString } from "class-validator";

export class ReqIdPostDto {
  @IsString()
  @IsNotEmpty()

  id: string;

}
