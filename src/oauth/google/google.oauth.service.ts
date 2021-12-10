import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ValidationError } from 'class-validator';
import { from, map, mergeMap, Observable } from 'rxjs';
import { IAuthService } from 'src/auth/interface/auth.interface';
import { Responser } from 'src/common/utils/responser';
import { IUserService } from 'src/user/interface/user.interface';

@Injectable()
export class GoogleService {
  private userService: IUserService;
  private authService: IAuthService;
  constructor(
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    @Inject('AUTH_PACKAGE') private authClient: ClientGrpc,
  ) {}

  googleCheck(req): Observable<any> {
    if (!req.user) throw new UnauthorizedException();

    const { email } = req.user;
    if (!email) throw new ValidationError();

    const loginRequestWithOauth = from(
      this.authService.loginWithOauth({ email, oauthProvider: 'google' }),
    );

    return from(loginRequestWithOauth).pipe(
      map((loginResult) => {
        if (!loginResult.success) return loginResult;
        return new Responser(
          loginResult.success,
          loginResult.message,
          loginResult.data,
        );
      }),
    );
  }

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
    this.authService = this.authClient.getService<IAuthService>('AuthService');
  }
}
