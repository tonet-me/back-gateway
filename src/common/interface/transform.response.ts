import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status?: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data?.message == 'okkk') return data.data.text;
        if (data.status)
          context.switchToHttp().getResponse().status(data.status);
        if (!data.success)
          context.switchToHttp().getResponse().status(data.data?.errorCode);

        return {
          success: data.success,
          message: data.message || '',
          data: data.data || {},
        };
      }),
    );
  }
}
