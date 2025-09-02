import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VotesService } from './votes.service';
import { VoteResolver } from './votes.resolver';

@Module({
  imports: [PrismaModule],
  providers: [VoteResolver, VotesService],
})
export class VotesModule {}

