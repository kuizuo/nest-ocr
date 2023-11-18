import { IsBase64, IsBoolean, IsString } from 'class-validator'

export class SlideDto {
  @IsString()
  @IsBase64()
  image: string

  @IsString()
  @IsBase64()
  bg_image: string

  @IsBoolean()
  is_match: boolean
}
