import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "../../../entities/user.entity";
import { CreateUserDto } from "../dto/req/create-user.dto";
import { IResAllUsersDto } from "../dto/res/i-res-all-users.dto";


@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        ...createUserDto
      },
    })
  }

  findAll(): Promise<IResAllUsersDto[]> {
    return this.prisma.user.findMany({
      select: {
        account: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })


  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })

  }
  async findOneByAccount(account: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        account: account,
      },
    })

  }


  async findOneById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id: id
      },
    })

  }
  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

}
