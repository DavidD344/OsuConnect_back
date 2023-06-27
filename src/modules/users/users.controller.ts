import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from 'src/auth/guards/role.guard';
import Role from 'src/auth/roles/auth.role';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/req/create-user.dto';
import { SingInDto } from './dto/req/sign-in.dto';
import { IResJwtTokenDto } from './dto/res/i-res-jwt-token.dto';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IResSafeUserDto } from './dto/res/i-res-safe-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @ApiTags('users')
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.signUp(createUserDto);
  }
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() singInDto: SingInDto): Promise<IResJwtTokenDto> {
    return this.usersService.signIn(singInDto);
  }


  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
  // ===============================================================================

  @Get()
  // Aparanemtenete ess prec isa do decorator de baixo para receber o user pois decorators sao executados de baixo para cima
  @UseGuards(RoleGuard([Role.Admin, Role.User]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findAll(@CurrentUser() userData: IResSafeUserDto): Promise<IResSafeUserDto[]> {
    return this.usersService.findAll();
  }

}
