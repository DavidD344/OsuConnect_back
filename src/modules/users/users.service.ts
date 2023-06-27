import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/req/create-user.dto';
import { SingInDto } from './dto/req/sign-in.dto';
import { IResAllUsersDto } from './dto/res/i-res-all-users.dto';
import { IResJwtTokenDto } from './dto/res/i-res-jwt-token.dto';
import { UsersRepository } from './repositories/users.repository';
@Injectable()
export class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService
  ) { }
  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userAlreadyExistsByEmail = await this.usersRepository.findOneByEmail(createUserDto.email)
    if (userAlreadyExistsByEmail) {
      throw new PreconditionFailedException('Email já cadastrado')
    }
    const userAlreadyExistsByAccount = await this.usersRepository.findOneByAccount(createUserDto.account)
    if (userAlreadyExistsByAccount) {
      throw new PreconditionFailedException('Nome de usuário já cadastrado')
    }

    const hashPass = await bcrypt.hash(createUserDto.password, +process.env.BCRYPT_SALT)
    const user = await this.usersRepository.createUser({ ...createUserDto, password: hashPass })


    return { ...user, password: undefined }
  }

  private async checkPassword(password: string, bdPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, bdPassword)
  }

  async signIn(singInDto: SingInDto): Promise<IResJwtTokenDto> {
    const userAlreadyExists = await this.usersRepository.findOneByEmail(singInDto.email)// verifico se o usuario existe

    if (!userAlreadyExists) {
      throw new PreconditionFailedException('Usuário e/ou senha incorretos!')
    }

    const match = await this.checkPassword(singInDto.password, userAlreadyExists.password)// verifica se as senhas são as mesmas
    if (!match) {
      throw new NotFoundException("Usuário e/ou senha incorretos!")
    }

    const jwtToken = await this.authService.createAccessToken(userAlreadyExists.id)

    if (!jwtToken) {
      throw new PreconditionFailedException('Token não encontrado')

    }

    const resToken: IResJwtTokenDto = { jwtToken: jwtToken, account: userAlreadyExists.account, role: userAlreadyExists.role }
    return resToken


  }
  findAll(): Promise<IResAllUsersDto[]> {
    return this.usersRepository.findAll()
  }
  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
