import { IsNotEmpty, IsString } from "class-validator";

export class ReqReactPostDto {

  @IsString()
  @IsNotEmpty()
  postId: string;


  @IsString()
  @IsNotEmpty()
  emoji: string;

  // @IsBoolean()
  // @IsNotEmpty()
  // remove: boolean;

}

