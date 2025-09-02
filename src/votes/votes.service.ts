import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vote } from '@prisma/client';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Vote[]> {
    return this.prisma.vote.findMany();
  }

  async castVote(videoId: number): Promise<Vote> {
    return this.prisma.vote.create({
      data: {
        videoId,
      },
    });
  }
}

