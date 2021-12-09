import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './gaurd/google.oauth.guard';
import { GoogleService } from './google.oauth.service';

@Controller('oauth/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/check')
  @UseGuards(AuthGuard('google'))
  googleAuthCheck(@Req() req) {
    return this.googleService.googleCheck(req);
  }

  @Get('/oauth')
  @UseGuards(GoogleOauthGuard)
  oauth() {}
}
