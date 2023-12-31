import { User } from "@prisma/client";
export class UserEntity implements User {
  id: string;
  email: string;
  account: string;
  lastname: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

}
