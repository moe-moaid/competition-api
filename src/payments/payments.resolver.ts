import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => String)
  createPaymentIntent(
    @Args('videoId', { type: () => Int }) videoId: number,
    @Args('amount', { type: () => Int, nullable: true }) amount?: number,
  ): Promise<string> {
    return this.paymentsService.createPaymentIntent(videoId, amount);
  }
}
