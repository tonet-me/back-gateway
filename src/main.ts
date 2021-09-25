import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/utils/transform.response';
import { AllExceptionsFilter } from './common/filter/allExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);

  app.use(helmet());
  app.use(compression());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const PORT: number = configService.get('port');
  const HOST: string = configService.get('host');

  await app
    .listen(PORT)
    .then(() => {
      Logger.log(
        `in 🚀 ${HOST}:${PORT} 🚀`,
        'RUN API-GATEWAY SERVER SUCCESSFUL',
      );
    })
    .catch((err) => {
      Logger.error(err, 'RUN API-GATEWAY SERVER FAILD');
    });
}

bootstrap();
