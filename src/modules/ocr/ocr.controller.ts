import { Body, Controller, OnModuleInit, Post } from '@nestjs/common'
import { Client, ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { Character } from './interfaces/character.interface'
import { Reply } from './interfaces/reply.interface'
import { grpcClientOptions } from 'src/grpc-client.options'
import { CharacterDto } from './dtos/character.dto'
import { SelectDto } from './dtos/select.dto'
import { Select } from './interfaces/select.interface'
import { SlideDto } from './dtos/slide.dto'
import { Slide } from './interfaces/slide.interface'

interface OCRService {
  /** 英数 */
  Character(data: Character): Observable<Reply>

  /** 点选 */
  Select(data: Select): Observable<Reply>

  /** 滑块 */
  Slide(data: Slide): Observable<Reply>
}

@Controller('ocr')
export class OcrController implements OnModuleInit {
  private ocrService: OCRService

  @Client(grpcClientOptions)
  client: ClientGrpc

  onModuleInit() {
    this.ocrService = this.client.getService('OCR')
  }

  @Post('character')
  character(@Body() dto: CharacterDto): Observable<Reply> {
    const buffer = Buffer.from(dto.image, 'base64')

    return this.ocrService.Character({ image: buffer })
  }

  @Post('select')
  select(@Body() dto: SelectDto): Observable<Reply> {
    const buffer = Buffer.from(dto.image, 'base64')

    return this.ocrService.Select({ image: buffer })
  }

  @Post('slide')
  slide(@Body() dto: SlideDto): Observable<Reply> {
    const buffer = Buffer.from(dto.image, 'base64')
    const bg_buffer = Buffer.from(dto.bg_image, 'base64')

    return this.ocrService.Slide({
      image1: buffer,
      image2: bg_buffer,
      isMatch: dto.is_match,
    })
  }
}
