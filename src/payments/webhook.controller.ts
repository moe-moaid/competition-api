import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import { Response, Request } from 'express';
import Stripe from 'stripe';
import { VotesService } from 'src/votes/votes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('webhook')
export class WebhookController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  });

  constructor(
    private readonly voteService: VotesService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('stripe')
  async handleStripeWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const videoId = Number(intent.metadata.videoId);

      // Find and update the payment record using the Stripe payment intent ID
      const payment = await this.prisma.payment.update({
        where: { stripePaymentIntentId: intent.id },
        data: { status: 'SUCCEEDED' },
      });

      // Cast the vote
      const vote = await this.voteService.castVote(videoId);

      // Link the payment to the vote
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { voteId: vote.id },
      });
    }

    res.json({ received: true });
  }
}
