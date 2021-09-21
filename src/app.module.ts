import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { AppController } from './app.controller';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env.prod'],
      load: [serverConf, dbConf],
    }),
    AuthModule,
    UserModule,
    CardModule,
    CountryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
