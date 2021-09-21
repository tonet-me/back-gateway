import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COUNTRY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['tonet.country'],
          protoPath: join(__dirname, '../../proto/country.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [CountryController],
})
export class CountryModule {}
