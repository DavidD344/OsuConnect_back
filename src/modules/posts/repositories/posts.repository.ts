import { Injectable } from "@nestjs/common";
import { PostEntity } from "src/entities/post.entity";
import { UserEntity } from "src/entities/user.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { ReqAccountPostDto } from "../dto/req/req-account-post.dto";
import { ReqCreatePostDto } from "../dto/req/req-create-post.dto";
import { ReqIdPostDto } from "../dto/req/req-id-post.dto";
import { IResSafePostDto } from "../dto/res/i-res-safe-post.dto copy";



@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createPost(accountAuthor: ReqAccountPostDto, createPostDto: ReqCreatePostDto): Promise<PostEntity> {

    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authoraccount: accountAuthor.account

      }
    })
  }
  async verifyUserExist(accountAuthor: ReqAccountPostDto): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        account: accountAuthor.account
      }
    })
  }



  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany()
  }


  async findPostById(idPost: ReqIdPostDto): Promise<PostEntity> {
    return await this.prisma.post.findUnique({
      where: {
        id: idPost.id
      },
    })

  }





  async findAllPostsByAuthor(accountAuthor: ReqAccountPostDto): Promise<IResSafePostDto[]> {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        updatedAt: true
      },
      where: {
        authoraccount: accountAuthor.account
      },

    })

  }
}


