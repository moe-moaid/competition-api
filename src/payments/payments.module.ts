import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WebhookController } from './webhook.controller';
import { VotesModule } from 'src/votes/votes.module';

@Module({
  imports: [PrismaModule, forwardRef(() => VotesModule)],
  providers: [PaymentsResolver, PaymentsService],
  controllers: [WebhookController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
