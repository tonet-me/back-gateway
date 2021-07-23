import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: path.join(__dirname, '../proto/user.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
