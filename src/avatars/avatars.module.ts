import { Module } from '@nestjs/common';
import { AvatarService } from './avatars.service';
import { AvatarController } from './avatars.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AvatarController], // REST endpoint
  providers: [AvatarService], //Service
  imports: [PrismaModule],
})
export class AvatarsModule {}
