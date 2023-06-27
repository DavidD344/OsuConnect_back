import { Body, Controller, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import RoleGuard from 'src/auth/guards/role.guard';
import Role from 'src/auth/roles/auth.role';
import { IResSafeUserDto } from '../users/dto/res/i-res-safe-user.dto';
import { ReqReactPostDto } from './dto/req/req-react-post.dto';
import { IResReactPostDto } from './dto/res/i-res-react-post.dto';
import { ReactService } from './react.service';

@Controller('react')
export class ReactController {
  constructor(private readonly reactService: ReactService) {
  }

  @Put()
  @UseGuards(RoleGuard([Role.User]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)

  async updateReactPost(@CurrentUser() userData: IResSafeUserDto, @Body() reactPostDto: ReqReactPostDto): Promise<IResReactPostDto> {
    return await this.reactService.updateReactPost(userData, reactPostDto);
  }
}

