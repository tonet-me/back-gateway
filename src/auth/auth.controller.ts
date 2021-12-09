import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { IResponse } from 'src/common/interface/responser.interface';
import { GetRefreshTokenDTO } from './dto/get-refresh-token.dto';
import { IAuthService, ILoginResult } from './interface/auth.interface';

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

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }
}
