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
        location: true,
        socialMedias: true,
        avatar: true,
      },
    });
  }

  async findVideosByArtistId(artistId: number): Promise<Video[]> {
    return this.prisma.video.findMany({
      where: { artistId },
    });
  }

  async findSingleArtist(artistId: number): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        videos: true,
        location: true,
        socialMedias: true,
        avatar: true,
      }
    })
  }
}
