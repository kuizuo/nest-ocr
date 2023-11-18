import { ClientOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'ocr',
    protoPath: join(__dirname, './modules/ocr/ocr.proto'),
    url: 'localhost:50051',
  },
}
