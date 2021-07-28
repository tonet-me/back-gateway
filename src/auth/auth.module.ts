import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_OTP_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['user.auth.otp'],
          protoPath: join(__dirname, '../../proto/auth.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
