import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { AddressEntity } from './../../address/entities/address.entity';

export class CreateEventDto {
  @ApiProperty({
    description: 'Título do evento a ser criado.',
    example: 'Workshop Avançado de React.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descrição do evento, fornecer ao menos 200 caracteres.',
    example: `Aprofunde seus conhecimentos em React neste workshop intensivo de 2 dias. Aprenda as melhores práticas, novos recursos e técnicas avançadas diretamente com especialistas em React. Este evento é perfeito para desenvolvedores que desejam elevar suas habilidades em React para o próximo nível.`,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(200)
  description: string;

  @ApiProperty({ description: 'Número total de ingressos.', example: 200 })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  remainingTickets: number;

  @ApiProperty({
    description: 'Data de ínicio do evento. Fornecer timestamp.',
    example: 1698165000000,
  })
  @IsInt()
  @IsNotEmpty()
  eventStartsAt: Date;

  @ApiProperty({
    description: 'Data de fim do evento. Fornecer timestamp.',
    example: 1698165000000,
  })
  @IsInt()
  @IsNotEmpty()
  eventFinishAt: Date;

  @ApiProperty({ description: 'Preço de cada ingresso.', example: 49.9 })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Imagem (Poster do evento) convertida para base64.',
    example: 'data:image/jpeg;base64,/9j/4AAQSk...',
  })
  @IsNotEmpty()
  @IsString()
  poster: string;

  @ApiProperty({
    description: 'Objeto contendo informações de endereço.',
    type: AddressEntity,
    example: {
      complement: 'Stand 04',
      houseNumber: 335,
      cep: '12345-123',
      cityId: '8a463c1c-2ca7-4fa2-bf98-075f56f19011',
    },
  })
  @IsNotEmpty()
  address: AddressEntity;
}
