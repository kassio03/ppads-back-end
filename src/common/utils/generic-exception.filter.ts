import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('ERROR: ', exception.message, exception.stack);
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const res = exception.getResponse();
      response.status(statusCode).json({
        statusCode,
        message: typeof res === 'string' ? res : (res as any).message,
      });
      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Erro genérico não tratado',
    });
  }
}
