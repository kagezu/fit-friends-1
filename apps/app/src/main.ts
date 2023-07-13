import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  const config = new DocumentBuilder()
    .setTitle('The «FitFriends» service')
    .setDescription('Service API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('spec', app, document);
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
