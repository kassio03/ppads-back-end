import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome que será exibido no perfil.',
    example: 'Kassio Ferreira',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'E-mail que será usado para login.',
    example: 'exemplo@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha que será usado para login.',
    example: 'exemplo123',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
