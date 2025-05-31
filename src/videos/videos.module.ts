import { Module } from '@nestjs/common';
import { VideosResolver } from './videos.resolver';
import { VideosService } from './videos.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VideosResolver, VideosService]
})
export class VideosModule {}
