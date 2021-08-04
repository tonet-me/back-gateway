import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env.prod'],
      load: [serverConf, dbConf],
    }),
    AuthModule,
  ],
})
export class AppModule {}
