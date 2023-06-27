import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken'
import { AuthRepository } from './repositories/auth.repository';
import { UserEntity } from 'src/entities/user.entity';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';
@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }
  // public porque vou usar na aplicação toda e quero que todos possam usar o que vai ser entregie

  public async createAccessToken(userId: string): Promise<string> {
    // retorna jwt
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    }
    )
  }
  public async validateUser(jwtPayload: JwtPayload): Promise<UserEntity> {

    const user = await this.authRepository.findOneUser(jwtPayload.userId)

    //adicionar verificação de role
    if (!user) {
      throw new UnauthorizedException('User not found')//cria objeto que recebe essa mensagem
    }
    return user

  }

  private static jwtExtractor(request: Request): string {
    // Extraio o jwt que foi colocado no header da requisição o (bearer token)
    const authHeader = request.headers.authorization
    //authHeader armazenou literalmente "Bearer tokendeacesso"

    console.log('ola')
    console.log(authHeader)
    if (!authHeader) {
      throw new BadRequestException('Bad request')
    }
    const [, token] = authHeader.split(' ')// separa o Bearer do token
    console.log(token)
    return token

  }

  public returnJwtExtractor(): (req: Request) => string {

    return AuthService.jwtExtractor
  }




}
