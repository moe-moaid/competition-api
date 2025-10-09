import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ArtistsResolver, ArtistsService],
})
export class ArtistsModule {}
