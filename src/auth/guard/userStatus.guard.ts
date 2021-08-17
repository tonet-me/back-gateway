import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IUser } from 'src/user/interface/user.interface';

@Injectable()
export class UserStatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userStatus = this.reflector.get<string[]>(
      'userStatus',
      context.getHandler(),
    );
    if (!userStatus) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;

    if (userStatus.includes(user.status)) return true;
    return false;
  }
}
