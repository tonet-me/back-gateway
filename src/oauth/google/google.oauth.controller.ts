import {
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './gaurd/google.oauth.guard';
import { GoogleService } from './google.oauth.service';

@Controller('oauth/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  @Get('/')
  @UseGuards(GoogleOauthGuard)
  googleAuth() {}

  @Get('/check')
  @UseGuards(GoogleOauthGuard)
  googleAuthCheck(@Req() req) {
    return this.googleService.googleCheck(req);
  }

  ///*******************************///
  //DELETEME: for test
  @Get('/redirect-test')
  @UseGuards(GoogleOauthGuard)
  oauthRedirectOauth(@Req() req) {
    if (process.env.ENV != 'production') return this.googleAuthCheck(req);
    throw new ForbiddenException('no dev');
  }
  //DELETEME: for test
  ///*******************************///
}
