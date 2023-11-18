import { Body, Controller, OnModuleInit, Post } from '@nestjs/common'
import { Client, ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { Character } from './interfaces/character.interface'
import { Reply } from './interfaces/reply.interface'
import { grpcClientOptions } from 'src/grpc-client.options'
import { CharacterDto } from './dtos/character.dto'
import { SelectDto } from './dtos/select.dto'
import { Select } from './interfaces/select.interface'

interface OCRService {
  /** 英数 */
  Character(image: Character): Observable<Reply>

  /** 点选 */
  Select(image: Select): Observable<Reply>

  /** 滑块 */
  // Slide(image: Character): Observable<Reply>;
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
}
