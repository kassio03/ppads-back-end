import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(200)
  description: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  remainingTickets: number;

  @IsInt()
  @IsNotEmpty()
  eventStartsAt: Date;

  @IsInt()
  @IsNotEmpty()
  eventFinishAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsUrl()
  @IsNotEmpty()
  poster: string;

  @IsString()
  @IsNotEmpty()
  addressId: string;
}
