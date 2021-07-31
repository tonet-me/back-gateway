import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { Responser } from 'src/common/utils/responser';
// import { Responser } from 'src/common/utils/responser';
import { AuthOtpDTO } from './dto/auth.otp.dto';
import { IAuthService, IMakeOtpResult } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  private authService: IAuthService;

  constructor(@Inject('AUTH_OTP_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  @Post('/otp')
  makeOtp(
    @Body() makeOtpBody: AuthOtpDTO,
  ): Observable<IResponse<IMakeOtpResult>> {
    console.log('body', makeOtpBody);

    return this.authService.makeOtp(makeOtpBody).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
