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
    let message: string = '';
    console.log('exception is: ', exception);
    // if (exception.data.statusCode) status = exception.data.statusCode;
    if (exception instanceof HttpException) {
      console.log('http');

      status = exception.getStatus();
    } else status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception?.message) {
      message = exception.message;
    }
    response.status(status).json({
      success: false,
      message: '',
      data: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      },
    });
  }
}
