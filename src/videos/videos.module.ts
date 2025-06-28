import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [VideosController], // REST endpoint
  providers: [VideosService, PrismaService], //Service
  imports: [PrismaModule],
})
export class VideosModule {}
