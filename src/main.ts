import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const URL = `${process.env.BASE_URL}:${process.env.PORT}`;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'gateway',
        protoPath: path.join(__dirname, 'proto/user.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();
