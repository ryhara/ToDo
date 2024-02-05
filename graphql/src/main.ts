import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Next.jsからのリクエストを受け取るための設定
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  await app.listen(3000);
}
bootstrap();
