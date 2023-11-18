import { Module } from '@nestjs/common'
import { OcrController } from './ocr.controller'

@Module({
  imports: [],
  controllers: [OcrController],
})
export class OcrModule {}
