
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

  async create(createVideoDto: CreateVideoDto) {
    return this.prisma.video.create({
      data: createVideoDto,
    });
  }

  async findOne(id: string) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.video.delete({
      where: { id },
    });
  }
}
