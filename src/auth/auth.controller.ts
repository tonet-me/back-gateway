import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import {
  InjectThrottlerOptions,
  InjectThrottlerStorage,
  Throttle,
  ThrottlerGuard,
  ThrottlerStorageService,
} from '@nestjs/throttler';
import { from, map, mergeMap, Observable, of } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { Responser } from 'src/common/utils/responser';
import { LoginOtpDTO, MakeOtpDTO } from './dto/auth.otp.dto';
import { ThrottlerOTPGuard } from './guard/otp.throttler.guard';
import {
  IAuthService,
  ILoginOtpResult,
  IMakeOtpResult,
} from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  private authService: IAuthService;
  otpRequestTTL: number;
  otpLimitRequest: number;
  constructor(
    @Inject('AUTH_OTP_PACKAGE') private client: ClientGrpc,
    @InjectThrottlerStorage()
    private throttlerStorageService: ThrottlerStorageService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
    this.otpRequestTTL = this.configService.get('THROTTLE_TTL_OTP');
    this.otpLimitRequest = this.configService.get('THROTTLE_LIMIT_OTP');
  }

  @Post('/otp-make')
  @Throttle(2, 60)
  @UseGuards(ThrottlerGuard)
  makeOtp(
    @Body() makeOtpBody: MakeOtpDTO,
  ): Observable<IResponse<IMakeOtpResult>> {
    return from(this.authService.makeOtp(makeOtpBody));
  }

  @UseGuards(ThrottlerOTPGuard)
  @Post('/otp-login')
  loginOtp(
    @Body() loginOtpBody: LoginOtpDTO,
  ): Observable<IResponse<ILoginOtpResult>> {
    const loginRequestOTP = from(this.authService.loginOtp(loginOtpBody));

    return loginRequestOTP.pipe(
      mergeMap((loginResult) => {
        if (!loginResult.success)
          this.addCountLimitedOtp(loginOtpBody.phoneNumber, this.otpRequestTTL);

        return from(this.getCountLimitedOtp(loginOtpBody.phoneNumber)).pipe(
          map((tryCount) => {
            return {
              loginResult,
              tryCount,
            };
          }),
        );
      }),
      map(({ loginResult, tryCount }) => {
        return new Responser(
          loginResult.success,
          loginResult.success
            ? loginResult.message
            : `${loginResult.message}, you can try ${tryCount} time(s)`,
          loginResult.data,
        );
      }),
    );
  }

  private addCountLimitedOtp(phoneNumber: string, ttl: number) {
    this.throttlerStorageService.addRecord(
      `countOtpRequest:${phoneNumber}`,
      ttl,
    );
  }

  private async getCountLimitedOtp(phoneNumber: string): Promise<number> {
    const tryReq = await this.throttlerStorageService.getRecord(
      `countOtpRequest:${phoneNumber}`,
    );
    return this.otpLimitRequest - tryReq.length;
  }
}
