import { Controller, Get, Param } from '@nestjs/common';
import { successBody } from '../../common/utils';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':stateId')
  async findAllCitiesByStateId(@Param('stateId') stateId: string) {
    const allCities = await this.cityService.findAllCitiesByStateId({
      stateId,
    });
    return successBody(allCities);
  }

  @Get('/cityId/:id')
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }
}
