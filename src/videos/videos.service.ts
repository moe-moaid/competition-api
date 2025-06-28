
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Video } from '@prisma/client';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Video[]> {
    return this.prisma.video.findMany();
  }

  async UploadVideo(dto: CreateVideoDto, filePath: string) {
    return this.prisma.video.create({
      data: {
        title: dto.title,
        description: dto.description,
        artistId: dto.artistId,
        category: dto.category,
        url: filePath,

      }
    });
  }

  async findOne(id: number) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.video.delete({
      where: { id },
    });
  }
}
