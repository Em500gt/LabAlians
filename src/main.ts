import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appServer = await NestFactory.create(AppModule, { abortOnError: false });
  appServer.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  appServer.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
  appServer.setGlobalPrefix('api');
  const port = process.env.PORT || 6000;
  await appServer.listen(port);
}

bootstrap();