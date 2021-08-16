import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth.controller';
@Global()
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
  exports: [ClientsModule],
})
export class AuthModule {}
