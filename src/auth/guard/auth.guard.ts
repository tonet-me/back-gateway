import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
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
    authHeader = authHeader.replace('Bearer ', '');
    console.log('token', authHeader);

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }
    return from(
      this.authService.validateAccessToken({ accessToken: authHeader }),
    ).pipe(
      map((data) => {
        console.log('map', data);
        if (data && data.success && data.data._id) {
          request.user = data.data;
          return true;
        } else return false;
      }),
    );
  }
}
// constructor(private readonly authService: AuthService) {}

// getRequest(context: ExecutionContext) {
//   const ctx = GqlExecutionContext.create(context);
//   return ctx.getContext().req;
// }

// async canActivate(context: ExecutionContext): Promise<boolean> {
//   const req = this.getRequest(context);
//   const authHeader = req.headers.authorization as string;

//   if (!authHeader) {
//     throw new BadRequestException('Authorization header not found.');
//   }

//   const {
//     isValid,
//     user,
//     isAdmin = false,
//   } = await this.authService.validateToken(authHeader);
//   console.log(isValid);

//   if (isValid) {
//     req.user = user;
//     req.user.isAdmin = isAdmin;
//     return true;
//   }
//   throw new UnauthorizedException('Token not valid');
// }
// }
