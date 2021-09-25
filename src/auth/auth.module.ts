import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL_OTP'),
        limit: config.get('THROTTLE_LIMIT_OTP'),
      }),
    }),
  ],
  controllers: [AuthController],
  exports: [ClientsModule],
})
export class AuthModule {}
