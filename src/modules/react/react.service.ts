import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReactEntity } from 'src/entities/react.entity';
import { PostsRepository } from '../posts/repositories/posts.repository';
import { IResSafeUserDto } from '../users/dto/res/i-res-safe-user.dto';
import { ReqReactPostDto } from './dto/req/req-react-post.dto';
import { IResReactPostDto } from './dto/res/i-res-react-post.dto';
import { ReactRepository } from './repositories/react.repository';
@Injectable()
export class ReactService {
  constructor(private readonly reactReposityory: ReactRepository, private readonly postsRepository: PostsRepository) { }


  async updateReactPost(userData: IResSafeUserDto, reactPostDto: ReqReactPostDto): Promise<IResReactPostDto> {


    const postAlreadyExist = await this.postsRepository.findPostById({ id: reactPostDto.postId })
    if (!postAlreadyExist) {
      throw new NotFoundException('Esse post não existe mais!');
    }
    const postAlreadyReactByUser = await this.reactReposityory.findReactPostByUser({ account: userData.account, postId: reactPostDto.postId })
    if (!postAlreadyReactByUser) {
      return this.createReact({ account: userData.account, emoji: reactPostDto.emoji, postId: reactPostDto.postId })
    }
    const idReact: string = postAlreadyReactByUser.id
    if (postAlreadyReactByUser.emoji === reactPostDto.emoji) {
      return this.removeReact(idReact)
    } else {
      return this.switchReact({ idReact: idReact, newEmoji: reactPostDto.emoji })
    }
  }


  async createReact(createReactPostInfo: ICaseCreateReactPostInfo): Promise<IResReactPostDto> {
    const reactPostEntity: ReactEntity = await this.reactReposityory.createReactPost(createReactPostInfo)
    if (reactPostEntity) {
      return {
        reactExists: true,
        message: 'Reação criada com sucesso!'

      }
    } else {
      throw new BadRequestException('Por algum motivo não foi possível adicionar sua reação!')
    }
  }
  async switchReact(switchReact: ICaseSwitchReact): Promise<IResReactPostDto> {

    const reactPostEntity: ReactEntity = await this.reactReposityory.switchReactPost(switchReact)

    if (reactPostEntity) {
      return {
        reactExists: true,
        message: 'Reação alterada com sucesso!'

      }
    } else {
      throw new BadRequestException('Por algum motivo não foi possível alterar sua reação!')
    }

  }

  async removeReact(idReact: string) {

    const reactPostEntity: ReactEntity = await this.reactReposityory.removeReactPost(idReact)

    if (reactPostEntity) {
      return {
        reactExists: false,
        message: 'Reação removida com sucesso!'

      }
    } else {
      throw new BadRequestException('Por algum motivo não foi possível remover sua reação!')
    }


  }

}
