import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3002', // allow your Next.js frontend
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
