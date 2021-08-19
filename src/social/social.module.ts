import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SocialController } from './social.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOCIAL_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['user.social'],
          protoPath: join(__dirname, '../../proto/social.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [SocialController],
  exports: [ClientsModule],
})
export class SocialModule {}
