import { Injectable } from "@nestjs/common";
import { ReactEntity } from "src/entities/react.entity";
import { PrismaService } from "src/prisma/prisma.service";




@Injectable()
export class ReactRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createReactPost(createReactPostInfo: ICaseCreateReactPostInfo): Promise<ReactEntity> {

    return this.prisma.react.create({
      data: {

        userAccount: createReactPostInfo.account,
        postId: createReactPostInfo.postId,
        emoji: createReactPostInfo.emoji,
      }
    })

  }

  async findReactPostByUser(findReactPost: ICaseFindReactPost): Promise<ReactEntity> {

    return this.prisma.react.findFirst({
      where: {
        postId: findReactPost.postId,
        userAccount: findReactPost.account
      }
    })
  }
  async switchReactPost(switchReact: ICaseSwitchReact): Promise<ReactEntity> {

    return this.prisma.react.update({
      where: { id: switchReact.idReact },

      data: {

        emoji: switchReact.newEmoji
      }
    })

  }
  async removeReactPost(idReact: string): Promise<ReactEntity> {

    return this.prisma.react.delete({
      where: { id: idReact },
    });

  }

}


