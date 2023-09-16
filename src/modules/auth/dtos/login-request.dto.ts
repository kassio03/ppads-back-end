import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description:
      'Email utilizado para efetuar login (já deve estar cadastrado)',
    example: 'exemplo@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Senha utilizada para efetuar login (já deve estar cadastrado)',
    example: 'exemplo123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
