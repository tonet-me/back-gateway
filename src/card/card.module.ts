import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CardController } from './card.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CARD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['user.card'],
          protoPath: join(__dirname, '../../proto/card.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [CardController],
  exports: [ClientsModule],
})
export class CardModule {}
