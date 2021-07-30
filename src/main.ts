import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NotFoundExceptionFilter } from './common/filter/notfound.filter';
import { TransformInterceptor } from './common/interface/transform.response';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalFilters(new NotFoundExceptionFilter());
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
