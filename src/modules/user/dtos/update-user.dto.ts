import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Novo nome.',
    example: 'Kassio Douglas',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Nova senha.',
    example: 'novaSenha123',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;
}
