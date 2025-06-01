import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      include: {
        videos: true,
      },
    });
  }
}
