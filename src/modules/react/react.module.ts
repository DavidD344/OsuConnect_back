import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsRepository } from '../posts/repositories/posts.repository';
import { ReactController } from './react.controller';
import { ReactService } from './react.service';
import { ReactRepository } from './repositories/react.repository';

@Module({
  controllers: [ReactController],
  providers: [ReactService, PrismaService, ReactRepository, PostsRepository]
})
export class ReactModule { }
