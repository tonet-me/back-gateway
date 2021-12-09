import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { AppController } from './app.controller';
import { StateModule } from './state/state.module';
import { ViewCardModule } from './view-card/view-card.module';
import { OAuthModule } from './oauth/oauth.module';

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
    StateModule,
    ViewCardModule,
    OAuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
