import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: number;
    let errorName = '';
    let message = '';

    if (exception instanceof HttpException) {
      const error: any = exception.getResponse().valueOf();
      message = error?.message;
      status = exception.getStatus();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    if (exception?.message) {
      errorName = exception.message;
    }
    response.status(status).json({
      success: false,
      message: errorName,
      data: {
        errorCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
    });
  }
}
