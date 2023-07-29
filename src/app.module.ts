import { Module } from '@nestjs/common';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [OcrModule],
})
export class AppModule {}
