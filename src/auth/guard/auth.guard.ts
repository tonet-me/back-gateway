import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { from, map, mapTo, Observable, of } from 'rxjs';
import { IAuthService } from 'src/auth/interface/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private authService: IAuthService;

  constructor(@Inject('AUTH_OTP_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }
  canActivate(context: ExecutionContext): Observable<any> {
    const request = context.switchToHttp().getRequest();
    let authHeader = request.headers.authorization as string;
    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }
    authHeader = authHeader.replace('Bearer ', '');

    return from(
      this.authService.validateAccessToken({ accessToken: authHeader }),
    ).pipe(
      map((data) => {
        if (data && data.success && data.data._id) {
          request.user = data.data;
          return true;
        } else return false;
      }),
    );
  }
}
