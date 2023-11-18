import { IsBase64, IsString } from 'class-validator'

export class CharacterDto {
  @IsString()
  @IsBase64()
  image: string
}
