import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

type myError = {
  readonly status: number
  readonly statusCode?: number

  readonly message?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  constructor() {
    this.registerCatchAllExceptionsHook()
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as myError)?.status ||
          (exception as myError)?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      (exception as any)?.response?.message ||
      (exception as myError)?.message ||
      `${exception}`

    // 系统内部错误时

    Logger.error(exception, undefined, 'Catch')

    // 返回基础响应结果
    const resBody = {
      code: status,
      message,
      data: null,
    }

    response.status(status).send(resBody)
  }

  registerCatchAllExceptionsHook() {
    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection: ', reason)
    })

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err)
    })
  }
}
