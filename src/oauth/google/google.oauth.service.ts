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
    @Inject('AUTH_OTP_PACKAGE') private authClient: ClientGrpc,
  ) {}

  googleCheck(req): Observable<any> {
    if (!req.user) throw new UnauthorizedException();

    const { email } = req.user;
    if (!email) throw new ValidationError();
    console.log('user is', req.user);

    console.log('email is', email);

    const loginRequestWithOauth = from(
      this.authService.loginWithOauth({ email }),
    );

    return from(this.userService.checkProfile({ email })).pipe(
      mergeMap((checkProfileResult) => {
        if (
          checkProfileResult &&
          checkProfileResult.success &&
          checkProfileResult.data._id
        ) {
          return from(loginRequestWithOauth).pipe(
            map((loginResult) => {
              console.log('logi result', loginResult);

              if (!loginResult.success) throw new ForbiddenException();
              return {
                checkProfileResult,
                loginResult,
              };
            }),
          );
        } else throw new ForbiddenException();
      }),
      map(({ checkProfileResult, loginResult }) => {
        return new Responser(loginResult.success, loginResult.message, {
          ...loginResult.data,
          status: checkProfileResult.data.status,
        });
      }),
    );
  }

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
    this.authService = this.authClient.getService<IAuthService>('AuthService');
  }
}
