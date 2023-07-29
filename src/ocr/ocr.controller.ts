import { Body, Controller, OnModuleInit, Post } from "@nestjs/common";
import { Client, ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Character } from "./interfaces/character.interface";
import { Reply } from "./interfaces/reply.interface";
import { grpcClientOptions } from "src/grpc-client.options";
import { CharacterDto } from "./dtos/character.dto";

interface OCRService {
  Character(image: Character): Observable<Reply>;

  // TODO: Add other type, e.g. select, slide, etc.
}

@Controller("ocr")
export class OcrController implements OnModuleInit {
  private ocrService: OCRService;

  @Client(grpcClientOptions)
  client: ClientGrpc;

  onModuleInit() {
    this.ocrService = this.client.getService("OCR");
  }

  @Post('character')
  character(@Body() dto: CharacterDto): Observable<Reply> {
    // 这里多一步 Base64 将文本解码成图片的操作
		// 主要是根据接口调用便携而定，最佳的做法肯定是类似上传文件，直接得到图片二进制数据，省去数据操作步骤
    const buffer = Buffer.from(dto.image, 'base64');
    
    return this.ocrService.Character({ image: buffer});
  }

  // TODO: Add other type, e.g. select, slide, etc.
}
