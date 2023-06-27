import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IResSafeUserDto } from 'src/modules/users/dto/res/i-res-safe-user.dto';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IResSafeUserDto => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const userData: IResSafeUserDto = {
      role: request.user.role,
      account: request.user.account
    }
    return userData
  },
);
//abstrai para onsgeuirmos pegar o user dentro da requisição
