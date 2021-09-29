import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CardModule } from 'src/card/card.module';
import { ViewCardController } from './view-card.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIEW_CARD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['view.card'],
          protoPath: join(__dirname, '../../proto/view-card.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
    CardModule,
  ],
  controllers: [ViewCardController],
  exports: [ClientsModule],
})
export class ViewCardModule {}
