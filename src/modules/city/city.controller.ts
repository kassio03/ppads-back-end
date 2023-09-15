import { Controller, Get, Param } from '@nestjs/common';
import { successBody } from 'src/common/utils';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async findAllCitiesByStateId(@Param('stateId') stateId: string) {
    const allCities = await this.cityService.findAllCitiesByStateId({
      stateId,
    });
    return successBody(allCities);
  }
}
