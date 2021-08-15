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
        console.log('data', data);

        // if (!data.success && data.data.statusCode) throw data;
        //   return {
        //     statusCode: data.status,
        //     timestamp: data.timestamp,
        //     path: data.path,
        //     message: data.message,
        //   };
        if (data.status)
          context.switchToHttp().getResponse().status(data.status);
        if (!data.success && data.data.statusCode)
          context.switchToHttp().getResponse().status(data.data.statusCode);

        return {
          success: data.success,
          message: data.message || '',
          data: data.data || {},
        };
      }),
    );
  }
}
