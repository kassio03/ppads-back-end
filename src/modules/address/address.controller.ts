import { Body, Controller, Param } from '@nestjs/common';
import { successBody } from 'src/common/utils';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  //@Post()
  //@UseGuards(JwtGuard)
  async create(@Body() createAddressDto: CreateAddressDto) {
    const res = await this.addressService.create(createAddressDto);
    return successBody(res);
  }

  //@Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.addressService.findOne(id);
    return successBody(res);
  }
}
