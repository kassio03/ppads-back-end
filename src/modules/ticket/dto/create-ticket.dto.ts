import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Id do evento.',
    example: '8a463c1c-2ca7-4fa2-bf98-075f56f19011',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  eventId: string;
}
