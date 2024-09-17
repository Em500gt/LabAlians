import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('LabAlians example')
    .setDescription('The LabAlians API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(appServer, config);
  SwaggerModule.setup('api-docs', appServer, document);

  await appServer.listen(port);
}

bootstrap();