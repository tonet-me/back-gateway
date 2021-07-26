import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();
    response
      .status(HttpStatus.NOT_FOUND)
      .json({
        status: HttpStatus.NOT_FOUND,
        message: `Cannot ${request.method} in url ${request.url}`,
        error: 'not found',
      })
      .send();
  }
}
