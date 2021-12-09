import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

import { GoogleOauthModule } from './google/google.oauth.module';

@Module({
  imports: [GoogleOauthModule],
})
export class OAuthModule {}
