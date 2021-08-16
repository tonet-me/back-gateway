import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: number;
    let errorName: string = '';
    let message: string = '';

    console.log('exception is: ', exception);
    // if (exception.data.statusCode) status = exception.data.statusCode;
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
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
    });
  }
}
