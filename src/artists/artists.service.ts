import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Artist, Video } from '@prisma/client';

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

  async findVideosByArtistId(artistId: number): Promise<Video[]> {
    return this.prisma.video.findMany({
      where: { artistId },
    });
  }
}
