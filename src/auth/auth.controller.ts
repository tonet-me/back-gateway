import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { GetRefreshTokenOtpDTO } from './dto/get-refresh-token.dto';
import { IAuthService, ILoginOtpResult } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  private authService: IAuthService;
  otpRequestTTL: number;
  otpLimitRequest: number;
  constructor(@Inject('AUTH_OTP_PACKAGE') private client: ClientGrpc) {}

  @Post('/refresh-token')
  getRefreshToen(
    @Body() getRefreshToken: GetRefreshTokenOtpDTO,
  ): Observable<IResponse<ILoginOtpResult>> {
    return from(
      this.authService.getRefreshToken({
        refreshToken: getRefreshToken.refreshToken,
      }),
    );
  }

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }
}
