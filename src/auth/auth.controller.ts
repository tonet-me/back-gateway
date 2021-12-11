import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { CheckEmailBeforRegister } from './dto/check.register.mail.dto';
import { GetRefreshTokenDTO } from './dto/get-refresh-token.dto';
import { LoginWithEmailDTO } from './dto/login.email.dto';
import { RegisterWithEmailDTO } from './dto/register.email.dto';
import {
  IAuthService,
  ICheckEmailBeforRegisterResponse,
  ILoginResult,
} from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  private authService: IAuthService;
  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  @Post('/refresh-token')
  getRefreshToen(
    @Body() getRefreshToken: GetRefreshTokenDTO,
  ): Observable<IResponse<ILoginResult>> {
    return from(
      this.authService.getRefreshToken({
        refreshToken: getRefreshToken.refreshToken,
      }),
    );
  }

  @Post('/email/check-register')
  checkEmailBeforRegister(
    @Body() checkEmail: CheckEmailBeforRegister,
  ): Observable<IResponse<ICheckEmailBeforRegisterResponse>> {
    return from(this.authService.checkEmailBeforRegister(checkEmail));
  }

  @Post('/email/register')
  registerWithEmail(
    @Body() registerWithEmail: RegisterWithEmailDTO,
  ): Observable<IResponse<ILoginResult>> {
    return from(this.authService.registerWithEmail(registerWithEmail));
  }

  @Post('/email/login')
  loginWithEmail(
    @Body() loginWithEmail: LoginWithEmailDTO,
  ): Observable<IResponse<ILoginResult>> {
    return from(this.authService.loginWithEmail(loginWithEmail));
  }

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }
}
