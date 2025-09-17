import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vote } from '@prisma/client';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Vote[]> {
    return this.prisma.vote.findMany();
  }

  async castVote(videoId: number): Promise<Vote> {
    if (!videoId || Number.isNaN(videoId)) {
      throw new BadRequestException('Video id is required');
    }

    const videoExists = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!videoExists) {
      throw new NotFoundException(`Video with id ${videoId} not found`);
    }

    return this.prisma.vote.create({
      data: {
        videoId,
      },
    });
  }
}


