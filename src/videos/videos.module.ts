import { Module } from '@nestjs/common';
import { VideosResolver } from './videos.resolver';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [VideosController], // REST endpoint
  providers: [VideosResolver, VideosService, PrismaService], // GraphQL + Service
  imports: [PrismaModule],
})
export class VideosModule {}
