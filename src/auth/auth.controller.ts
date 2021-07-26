import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthOtpDTO } from './dto/auth.otp.dto';
import { IAuthService, IMakeOtpResponse } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  private authService: IAuthService;

  constructor(@Inject('AUTH_OTP_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  @Post('/otp')
  makeOtp(@Body() makeOtpBody: AuthOtpDTO): Observable<IMakeOtpResponse> {
    return this.authService.makeOtp(makeOtpBody);
  }
}
