import { Module } from '@nestjs/common'
import { OcrModule } from './modules/ocr/ocr.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

@Module({
  imports: [OcrModule],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
