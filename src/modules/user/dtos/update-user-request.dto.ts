import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
