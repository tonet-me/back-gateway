import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  //for test
  // @Get('/redirect')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.googleAuthCheck(req);
  // }
}
