import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const port = process.env.PORT || 6000;
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
