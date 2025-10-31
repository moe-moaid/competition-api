import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/webhook/stripe', bodyParser.raw({ type: 'application/json' }));
  await app.listen(7567);
}
bootstrap();
