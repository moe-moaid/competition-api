
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Avatar } from '@prisma/client';

@Injectable()
export class AvatarService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Avatar[]> {
    return this.prisma.avatar.findMany({
      include: {
        artist: {
          select: {name: true, location: {select:{country: true}}}
        }
      }
    });
  }

  async UploadImage(url: string) {
    return this.prisma.avatar.create({
      data: {
        url
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.avatar.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.avatar.delete({
      where: { id },
    });
  }
}
