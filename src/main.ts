import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(7567);
}
bootstrap();
// const app = await NestFactory.create(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}),AppModule, { cors: true });
