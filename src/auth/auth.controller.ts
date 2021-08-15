import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, map, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
// import { Responser } from 'src/common/utils/responser';
import { LoginOtpDTO, MakeOtpDTO } from './dto/auth.otp.dto';
import {
  IAuthService,
  ILoginOtpResult,
  IMakeOtpResult,
} from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  private authService: IAuthService;

  constructor(@Inject('AUTH_OTP_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  @Post('/otp-make')
  makeOtp(
    @Body() makeOtpBody: MakeOtpDTO,
  ): Observable<IResponse<IMakeOtpResult>> {
    return from(this.authService.makeOtp(makeOtpBody));
  }
  @Post('/otp-login')
  loginOtp(
    @Body() loginOtpBody: LoginOtpDTO,
  ): Observable<IResponse<ILoginOtpResult>> {
    return from(this.authService.loginOtp(loginOtpBody));
  }
}
