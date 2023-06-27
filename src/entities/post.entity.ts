import { Post } from "@prisma/client";
export class PostEntity implements Post {
  id: string;
  published: boolean;
  title: string;
  content: string;
  authoraccount: string;
  createdAt: Date;
  updatedAt: Date;


}
