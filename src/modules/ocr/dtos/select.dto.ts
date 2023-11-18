import { IsBase64, IsString } from 'class-validator';

export class SelectDto {
  @IsString()
  @IsBase64()
  image: string;
}


