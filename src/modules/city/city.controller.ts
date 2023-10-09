import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successBody } from '../../common/utils';
import { CityService } from './city.service';

@ApiTags('city')
@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({
    summary: 'Retorna a lista de cidades em um estado. Fornecer id do estado.',
  })
  @ApiResponse({ status: 200, description: 'Lista de cidades recuperada.' })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma cidade encontrada. Verificar o id passado.',
  })
  @Get('city/:stateId')
  async findAllCitiesByStateId(@Param('stateId') stateId: string) {
    const allCities = await this.cityService.findAllCitiesByStateId(stateId);
    return successBody(allCities);
  }

  @ApiOperation({ summary: 'Retorna uma única cidade ' })
  @ApiResponse({ status: 200, description: 'Cidade recuperada.' })
  @ApiResponse({
    status: 404,
    description: 'Cidade não encontrada. Verificar o id passado.',
  })
  @Get('cityId/:id')
  async findOne(@Param('id') id: string) {
    const city = await this.cityService.findOne(id);
    return successBody(city);
  }
}
