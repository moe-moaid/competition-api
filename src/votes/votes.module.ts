import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VotesService } from './votes.service';
import { VoteResolver } from './votes.resolver';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [PrismaModule, PaymentsModule],
  providers: [VoteResolver, VotesService],
})
export class VotesModule {}

