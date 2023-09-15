import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  complement: string;

  @IsNumber()
  houseNumber: number;

  @IsString()
  cep: string;

  @IsString()
  cityId: string;
}
