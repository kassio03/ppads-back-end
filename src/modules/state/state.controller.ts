import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successBody } from '../../common/utils';
import { StateService } from './state.service';

@ApiTags('state')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiOperation({ summary: 'Retorna todos os estados do Brasil.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estados recuperada com sucesso.',
  })
  @Get()
  async findAll() {
    const allStates = await this.stateService.findAll();
    return successBody(allStates);
  }
}
