import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STATE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['tonet.state'],
          protoPath: join(__dirname, '../../proto/state.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [StateController],
})
export class StateModule {}
