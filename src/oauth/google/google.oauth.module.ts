import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GoogleController } from './google.oauth.controller';
import { GoogleService } from './google.oauth.service';
import { GoogleStrategy } from './strategy/google.stretagy';

@Module({
  imports: [UserModule],
  controllers: [GoogleController],

  providers: [GoogleStrategy, GoogleService],
})
export class GoogleOauthModule {}
