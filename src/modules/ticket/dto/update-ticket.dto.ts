import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsNotEmpty()
  @IsBoolean()
  alreadyUsed: boolean;

  @IsNotEmpty()
  usedAt: Date;

  @IsNotEmpty()
  @IsString()
  qrCode: string;
}
