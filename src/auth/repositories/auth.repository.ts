import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "../../entities/user.entity";


@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findOneUser(userId: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id: userId }
    })
  }

}
