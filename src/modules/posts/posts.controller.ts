import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import RoleGuard from 'src/auth/guards/role.guard';
import Role from 'src/auth/roles/auth.role';
import { IResSafeUserDto } from '../users/dto/res/i-res-safe-user.dto';
import { ReqAccountPostDto } from './dto/req/req-account-post.dto';
import { ReqCreatePostDto } from './dto/req/req-create-post.dto';
import { ReqIdPostDto } from './dto/req/req-id-post.dto';
import { IResAuthorPostDto } from './dto/res/i-res-author-post.dto';
import { IResCreatedPostDto } from './dto/res/i-res-created-post.dto';
import { IResSafePostDto } from './dto/res/i-res-safe-post.dto copy';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(RoleGuard([Role.User]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async createPost(@CurrentUser() userData: IResSafeUserDto, @Body() createPostDto: ReqCreatePostDto): Promise<IResCreatedPostDto> {

    return await this.postsService.createPost(userData, createPostDto);
  }

  @Get()
  // @UseGuards(RoleGuard([Role.Admin]))
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.postsService.findAll();
  }
  //comentar as rotas e os services . é para ter um que busca todos os posts do autor e o outro é para achar o author do post pelo id

  //1
  @Get('/authorbypost')
  findAuthorPostById(@Body() idpost: ReqIdPostDto): Promise<IResAuthorPostDto> {
    return this.postsService.findAuthorPostById(idpost);
  }
  //2
  @Get('/authorall')
  findAllPostsByAuthor(@Body() account: ReqAccountPostDto): Promise<IResSafePostDto[]> {
    return this.postsService.findAllPostsByAuthor(account);
  }


}
  //Rotas
  //1- Author por id da postagem
  //2- Todos os posts de um autor

