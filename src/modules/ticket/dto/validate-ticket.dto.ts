import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTicketDto {
  @ApiProperty({
    description: 'qrCode a ser validado.',
    example: 'data:image/png;base64,iVBORYVE4qJpWp4hMqb1RMKl......',
  })
  @IsNotEmpty()
  @IsString()
  qrCode: string;
}
