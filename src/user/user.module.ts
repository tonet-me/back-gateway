import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['user.profile'],
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
