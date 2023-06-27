import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { IResSafeUserDto } from '../users/dto/res/i-res-safe-user.dto';
import { ReqAccountPostDto } from './dto/req/req-account-post.dto';
import { ReqCreatePostDto } from './dto/req/req-create-post.dto';
import { ReqIdPostDto } from './dto/req/req-id-post.dto';
import { IResAuthorPostDto } from './dto/res/i-res-author-post.dto';
import { IResCreatedPostDto } from './dto/res/i-res-created-post.dto';
import { IResSafePostDto } from './dto/res/i-res-safe-post.dto copy';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsRepository
  ) { }
  async createPost(userData: IResSafeUserDto, createPostDto: ReqCreatePostDto): Promise<IResCreatedPostDto> {

    const userExist: UserEntity = await this.postsRepository.verifyUserExist({ account: userData.account })
    if (!userExist) {
      throw new PreconditionFailedException("Esse post não existe mais!")

    }
    const postCreated: PostEntity = await this.postsRepository.createPost({ account: userData.account }, createPostDto)
    const resCreated: IResCreatedPostDto = { title: postCreated.title, message: `O post ${postCreated.title} foi criado com sucesso!` }
    return resCreated
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postsRepository.findAll()

  }

  async findAuthorPostById(idPost: ReqIdPostDto): Promise<IResAuthorPostDto> {
    const postBody: PostEntity = await this.postsRepository.findPostById(idPost)

    if (!postBody) {
      throw new PreconditionFailedException("Esse post não existe mais!")
    }

    return { postauthor: postBody.authoraccount, postname: postBody.id }
  }

  // ver no curso se eu vou fazer certo a busca depois

  async findAllPostsByAuthor(account: ReqAccountPostDto): Promise<IResSafePostDto[]> {
    return await this.postsRepository.findAllPostsByAuthor(account)



  }
}
