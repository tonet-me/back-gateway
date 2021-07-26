import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );
  const PORT = configService.get('port');
  const HOST = configService.get('host');
  await app.listen(PORT, () => {
    console.log(`API-GATEWAY run in ${HOST}:${PORT}`);
  });
}
bootstrap();
