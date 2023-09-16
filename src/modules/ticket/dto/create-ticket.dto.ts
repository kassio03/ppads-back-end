import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  eventId: string;
}
