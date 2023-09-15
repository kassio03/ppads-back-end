import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @MinLength(200)
  description: string;
}
