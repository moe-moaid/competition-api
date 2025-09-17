import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil"
  });

  /**
   * Create a PaymentIntent for a specific video
   * @param videoId the video being voted on
   * @param amount optional — default $5
   */
  async createPaymentIntent(videoId: number, amount = 300): Promise<string> {
    // you can store prices somewhere else, hardcode here for example purposes
    const currency = 'usd';

    const intent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        videoId: String(videoId),
      },
    });

    // return client_secret to the frontend to use in <Elements>
    return intent.client_secret!;
  }
}

