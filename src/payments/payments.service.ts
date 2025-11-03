import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a PaymentIntent for a specific video
   * @param videoId the video being voted on
   * @param amount charging fee - $3
   */
  async createPaymentIntent(videoId: number, amount = 300): Promise<string> {
    const intent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        videoId: String(videoId),
      },
    });
    await this.prisma.payment.create({
      data: {
        videoId,
        stripePaymentIntentId: intent.id,
        amount,
        currency: 'usd',
        status: 'PENDING',
      },
    });

    // return client_secret to the frontend to use in <Elements>
    return intent.client_secret!;
  }
}
